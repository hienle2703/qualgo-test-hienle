import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { detail, image } from "@/mock_data";
import { Colors } from "../constants/Colors";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AppStackParamList } from "../navigation/AppNavigation";
import { useDispatch } from "react-redux";
import { getMovieDetail } from "../redux/actions/movieAction";

type MovieDetailScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, "MovieDetailScreen">;
  route: RouteProp<AppStackParamList, "MovieDetailScreen">;
};

const MovieDetailScreen = ({ navigation, route }: MovieDetailScreenProps) => {
  const { imdbId } = route.params;

  // TODO: SET TYPE
  const dispatch = useDispatch<any>();

  const [mainImage, setMainImage] = useState<string>(image[0]);
  const [images, setImages] = useState([...image]);

  const { short, main } = detail || {};
  const {
    datePublished,
    aggregateRating,
    description,
    genre,
    director,
    actor,
    review,
    keywords,
  } = short || {};
  const relatedMovies = main?.moreLikeThisTitles?.edges || {};

  const goBack = () => navigation.goBack();

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
        <Text style={styles.ratingTxt}>
          {ratingValue}
          <Text style={styles.totalRatingTxt}>/10</Text>
        </Text>
      </View>
    );
  };

  const renderSubImages = ({ item, index }: { item: any; index: number }) => {
    const chooseImage = () => setMainImage(item);

    return (
      <TouchableOpacity onPress={chooseImage}>
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
    item: any;
    index: number;
  }) => {
    const { id, titleText, primaryImage, ratingsSummary } = item?.node || {};

    const goToMovie = () =>
      navigation.navigate("MovieDetailScreen", { imdbId: id });

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
        {renderRatingRow({ ratingValue: ratingsSummary?.aggregateRating ?? 0 })}
        <Text numberOfLines={2} style={styles.titleRelatedMovie}>
          {titleText?.text ?? ""}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(getMovieDetail(imdbId));
  }, [imdbId]);

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
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Avenger: End Game</Text>
          </View>
        </View>
        <View style={styles.dateInfoRow}>
          <Text style={styles.yearTxt}>{datePublished.split("-")?.[0]}</Text>
          <Text style={styles.yearTxt}> • {genre.join(", ")}</Text>
        </View>
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

        <View style={styles.ratingRow}>
          {renderRatingRow({ ratingValue: aggregateRating?.ratingValue ?? 0 })}
          <Text style={styles.ratingCountTxt}>
            By {aggregateRating.ratingCount} users
          </Text>
        </View>
        <Text>{description ?? ""}</Text>
        <View style={styles.separator} />
        <Text style={styles.infoText}>
          Director:{" "}
          <Text style={styles.mainInfoText}>
            {director.map((item) => item.name)?.join(", ")}
          </Text>
        </Text>
        <View style={styles.separator} />
        <Text style={styles.infoText}>
          Stars:{" "}
          <Text style={styles.mainInfoText}>
            {actor.map((item) => item.name)?.join(", ")}
          </Text>
        </Text>
        <View style={styles.separator} />
        <Text style={styles.infoText}>
          Keywords:{" "}
          <Text style={styles.mainInfoText}>
            {keywords.split(",").join(", ")}
          </Text>
        </Text>
        <View style={styles.separator} />
        <View style={styles.reviewRow}>
          <View style={styles.reviewMark} />
          <Text style={styles.reviewTitle}>
            User reviews{" "}
            <Text style={styles.reviewCount}>
              {aggregateRating.ratingCount}
            </Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllTxt}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reviewBox}>
          <View style={[styles.reviewRow, styles.spaceBetween]}>
            <View style={styles.featuredFlag}>
              <Text style={styles.featuredTxt}>Featured Review</Text>
            </View>
            {renderRatingRow({
              ratingValue: review?.reviewRating?.ratingValue ?? 0,
            })}
          </View>
          <Text style={styles.reviewHeader}>{review.name}</Text>
          <Text style={styles.reviewBody}>{review.reviewBody}</Text>
          <Text style={styles.reviewAuthor}>
            By {review.author.name} • {review.dateCreated}
          </Text>
        </View>
        <View style={styles.separator} />
        <FlatList
          data={relatedMovies}
          extraData={relatedMovies}
          renderItem={renderRelatedMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
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
  },
  backIcon: {
    height: 20,
    aspectRatio: 1,
  },
  backBtn: {
    position: "absolute",
    left: 0,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    marginVertical: 10,
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
});
