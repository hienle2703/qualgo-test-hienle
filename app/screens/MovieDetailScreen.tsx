import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AppStackParamList } from "../navigation/AppNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetail, popMovieStack } from "../redux/actions/movieAction";
import LoadingDialog from "../components/Loading/LoadingDialog";
import { MovieState } from "../redux/reducers/movieReducer";
import { RouteProp } from "@react-navigation/native";
import { AppDispatch } from "../redux/store";

type MovieDetailScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, "MovieDetailScreen">;
  route: RouteProp<AppStackParamList, "MovieDetailScreen">;
};

type Director = {
  name: string;
  url: string;
};

type Actor = {
  name: string;
  url: string;
};

type RelatedMovie = {
  node: {
    id: string;
    titleText: {
      text: string;
    };
    primaryImage: {
      url: string;
    };
    ratingsSummary: {
      aggregateRating: number;
    };
  };
};

const MovieDetailScreen: FC<MovieDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { imdbId } = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const { loading, movieStack } = useSelector(
    (state: MovieState) => state.movie
  );

  const [movieDetail, setMovieDetail] = useState(movieStack.at(-1));
  const [mainImage, setMainImage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const { short, main } = movieDetail || {};
  const {
    datePublished,
    aggregateRating,
    description,
    genre,
    director,
    actor,
    review,
    keywords,
    name,
  } = short || {};
  const relatedMovies = main?.moreLikeThisTitles?.edges || {};

  const goBack = () => {
    navigation.goBack();
    dispatch(popMovieStack);
  };

  const renderRatingRow = ({
    ratingValue,
    size = 10,
  }: {
    ratingValue: number;
    size?: number;
  }) => {
    return (
      <View style={styles.ratingRow}>
        <Image
          resizeMode={"contain"}
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/009/342/559/small/mobile-game-golden-star-clipart-design-illustration-free-png.png",
          }}
          style={[styles.starIcon, { height: size * 2 }]}
        />
        <Text style={[styles.ratingTxt, { fontSize: size * 2 }]}>
          {ratingValue}
          <Text style={styles.totalRatingTxt}>/10</Text>
        </Text>
      </View>
    );
  };

  const renderSubImages = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    const chooseImage = () => setMainImage(item);

    return (
      <TouchableOpacity key={`keySubImage ${index}`} onPress={chooseImage}>
        <Image
          source={{ uri: item }}
          resizeMode={"cover"}
          style={styles.subImage}
        />
      </TouchableOpacity>
    );
  };

  const renderRelatedMovies = ({
    item,
    index,
  }: {
    item: RelatedMovie;
    index: number;
  }) => {
    const { id, titleText, primaryImage, ratingsSummary } = item?.node || {};

    const goToMovie = () =>
      navigation.push("MovieDetailScreen", { imdbId: id });

    return (
      <TouchableOpacity
        key={`relatedMovieKey ${index}`}
        style={styles.relatedMovieContainer}
        onPress={goToMovie}
      >
        <Image
          source={{ uri: primaryImage?.url }}
          height={150}
          style={styles.relatedMovieImage}
          resizeMode="contain"
        />
        {renderRatingRow({
          ratingValue: ratingsSummary?.aggregateRating ?? 0,
          size: 5,
        })}
        <Text numberOfLines={2} style={styles.titleRelatedMovie}>
          {titleText?.text ?? ""}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(getMovieDetail(imdbId));
  }, [imdbId]);

  useEffect(() => {
    const targetMovie = movieStack.at(-1);
    setMovieDetail(targetMovie);

    const { short, top } = targetMovie || {};
    setMainImage(short?.image);

    let images: string[] = [short?.image];
    top?.primaryVideos?.edges?.forEach((item: any) => {
      images.push(item?.node?.thumbnail?.url);
    });
    setImages(images);
  }, [movieStack]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Image
              resizeMode="contain"
              source={require("../../assets/images/back.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            {name && (
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{name}</Text>
              </View>
            )}
          </View>

          <View style={styles.spaceBox} />
        </View>
        {datePublished && (
          <View style={styles.dateInfoRow}>
            <Text style={styles.yearTxt}>{datePublished?.split("-")?.[0]}</Text>
            <Text style={styles.yearTxt}> • {genre?.join(", ")}</Text>
          </View>
        )}
        {mainImage && images && (
          <>
            <Image
              source={{ uri: mainImage }}
              resizeMode={"cover"}
              style={styles.mainImage}
            />
            <FlatList
              data={images}
              extraData={images}
              horizontal
              renderItem={renderSubImages}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
        <View style={[styles.ratingRow, { marginVertical: 10 }]}>
          {renderRatingRow({ ratingValue: aggregateRating?.ratingValue ?? 0 })}
          {aggregateRating?.ratingCount && (
            <Text style={styles.ratingCountTxt}>
              By {aggregateRating?.ratingCount} users
            </Text>
          )}
        </View>
        <Text style={styles.description}>{description ?? ""}</Text>
        <View style={styles.separator} />
        {director && (
          <>
            <Text style={styles.infoText}>
              Director:{" "}
              <Text style={styles.mainInfoText}>
                {director?.map((item: Director) => item.name)?.join(", ")}
              </Text>
            </Text>
            <View style={styles.separator} />
          </>
        )}
        <Text style={styles.infoText}>
          Stars:{" "}
          <Text style={styles.mainInfoText}>
            {actor?.map((item: Actor) => item.name)?.join(", ")}
          </Text>
        </Text>
        <View style={styles.separator} />
        <Text style={styles.infoText}>
          Keywords:{" "}
          <Text style={styles.mainInfoText}>
            {keywords?.split(",")?.join(", ")}
          </Text>
        </Text>
        <View style={styles.separator} />
        <View style={styles.reviewRow}>
          <View style={styles.reviewMark} />
          <Text style={styles.reviewTitle}>
            User reviews{" "}
            <Text style={styles.reviewCount}>
              {aggregateRating?.ratingCount}
            </Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllTxt}>View all</Text>
          </TouchableOpacity>
        </View>
        {review && (
          <View style={styles.reviewBox}>
            <View style={[styles.reviewRow, styles.spaceBetween]}>
              <View style={styles.featuredFlag}>
                <Text style={styles.featuredTxt}>Featured Review</Text>
              </View>
              {renderRatingRow({
                ratingValue: review?.reviewRating?.ratingValue ?? 0,
              })}
            </View>
            <Text style={styles.reviewHeader}>{review?.name}</Text>
            <Text style={styles.reviewBody}>{review?.reviewBody}</Text>
            <Text style={styles.reviewAuthor}>
              By {review?.author?.name} • {review?.dateCreated}
            </Text>
          </View>
        )}
        {relatedMovies && (
          <>
            <View style={styles.separator} />
            <View style={styles.reviewRow}>
              <View style={styles.reviewMark} />
              <Text style={styles.reviewTitle}>More like this</Text>
            </View>
            <FlatList
              data={relatedMovies}
              extraData={relatedMovies}
              renderItem={renderRelatedMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedMoviesContainer}
            />
          </>
        )}
      </ScrollView>
      {loading && <LoadingDialog />}
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
  },
  backIcon: {
    height: 20,
    aspectRatio: 1,
  },
  backBtn: {
    flex: 1 / 4,
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  mainImage: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  subImage: {
    borderRadius: 10,
    aspectRatio: 1,
    width: 50,
    marginRight: 10,
  },
  inactiveImage: {
    tintColor: "gray",
  },
  blurImage: {
    position: "absolute",
    opacity: 0.3,
    borderRadius: 10,
    aspectRatio: 1,
    width: 50,
    marginRight: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    height: 20,
    aspectRatio: 1,
    marginRight: 5,
  },
  ratingTxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalRatingTxt: {
    color: Colors.dustyGray,
  },
  ratingCountTxt: {
    marginLeft: 10,
    fontSize: 13,
    color: Colors.dustyGray,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.alto,
    marginVertical: 10,
  },
  dateInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  yearTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dustyGray,
  },
  infoText: {
    fontSize: 16,
    color: Colors.dustyGray,
    marginVertical: 10,
  },
  mainInfoText: {
    color: Colors.corn,
    fontWeight: "bold",
  },
  reviewMark: {
    backgroundColor: Colors.corn,
    width: 3,
    height: 20,
    marginRight: 10,
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewCount: {
    fontSize: 14,
    fontWeight: "200",
    marginLeft: 10,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  featuredFlag: {
    backgroundColor: Colors.sunGlow,
    padding: 5,
    borderRadius: 5,
  },
  featuredTxt: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  reviewHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewBody: {
    fontSize: 14,
  },
  reviewBox: {
    marginVertical: 10,
    backgroundColor: Colors.white,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  viewAllTxt: {
    color: Colors.dustyGray,
    fontWeight: "bold",
    marginLeft: 20,
  },
  reviewAuthor: {
    marginTop: 10,
    color: Colors.corn,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitleContainer: {
    backgroundColor: Colors.imdb,
    padding: 10,
    borderRadius: 5,
  },
  relatedMovieImage: {
    borderRadius: 10,
  },
  relatedMovieContainer: {
    marginRight: 10,
    width: 100,
  },
  titleRelatedMovie: {
    width: 100,
    fontSize: 12,
  },
  relatedMoviesContainer: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    fontStyle: "italic",
  },
  spaceBox: {
    flex: 1 / 4,
  },
});
