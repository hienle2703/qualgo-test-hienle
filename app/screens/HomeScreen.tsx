import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AppStackParamList } from "../navigation/AppNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/actions/movieAction";
import { debounce } from "../utils/input_utils";
import { MovieState } from "../redux/reducers/movieReducer";
import { AppDispatch } from "../redux/store";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, "MovieDetailScreen">;
};

type MovieItem = {
  imdb_id: string;
  img_poster: string;
  aka: string;
  actors: string;
  rank: number;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { movies } = useSelector((state: MovieState) => state.movie);

  const [searchInput, setSearchInput] = useState<string>("");
  const [movieList, setMovieList] = useState([...movies]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const onChangeSearchInput = (value: string) => setSearchInput(value);

  const onRefreshList = useCallback(() => {
    setIsRefreshing(true);
    dispatch(getAllMovies(searchInput));

    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [movies]);

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text>No movies match your search.</Text>
      </View>
    );
  };

  const renderMovieRow = ({
    item,
    index,
  }: {
    item: MovieItem;
    index: number;
  }) => {
    const { imdb_id, img_poster, aka, actors, rank } = item || {};

    const goToMovieDetail = () =>
      navigation.navigate("MovieDetailScreen", { imdbId: imdb_id });

    return (
      <TouchableOpacity
        key={`keyMovie ${index}`}
        style={styles.movieRow}
        onPress={goToMovieDetail}
      >
        <Image
          style={styles.squaredPoster}
          source={{
            uri: img_poster,
          }}
          resizeMode="cover"
        />
        <View style={styles.infoColumn}>
          <Text style={styles.movieTitle}>{aka}</Text>
          <Text style={styles.actors}>{actors}</Text>
        </View>
        <Text style={styles.actors}>#{rank}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    debounce(dispatch(getAllMovies(searchInput)), 500);
  }, [searchInput]);

  useEffect(() => {
    setMovieList(movies);
  }, [movies]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Image
        style={styles.imdbLogo}
        resizeMode="contain"
        source={{
          uri: "https://cdn.icon-icons.com/icons2/413/PNG/256/IMDB_41225.png",
        }}
      />
      <Text style={styles.findTxt}>Find your favourite movie and TV shows</Text>
      <View style={styles.inputContainer}>
        <Image
          style={styles.searchIcon}
          source={{
            uri: "https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png",
          }}
        />
        <TextInput
          style={[
            styles.inputStyle,
            Platform.OS === "ios" && { paddingVertical: 10 },
          ]}
          value={searchInput}
          onChangeText={onChangeSearchInput}
          placeholder="Search movies..."
          placeholderTextColor={Colors.black}
        />
      </View>

      <FlatList
        data={movieList}
        extraData={movieList}
        renderItem={renderMovieRow}
        contentContainerStyle={styles.contentList}
        refreshing={isRefreshing}
        onRefresh={onRefreshList}
        ListEmptyComponent={renderEmptyList}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imdbLogo: {
    width: 70,
    aspectRatio: 1,
    alignSelf: "center",
  },
  findTxt: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 20,
  },
  searchIcon: {
    height: 20,
    aspectRatio: 1,
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.alto,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputStyle: {
    paddingVertical: 5,
  },
  movieRow: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  contentList: {
    paddingTop: 10,
    paddingBottom: 100,
  },
  squaredPoster: {
    aspectRatio: 1,
    width: 60,
    borderRadius: 10,
  },
  infoColumn: {
    marginLeft: 10,
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actors: {
    fontSize: 10,
    color: Colors.dustyGray,
    fontStyle: "italic",
  },
  emptyListContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
});
