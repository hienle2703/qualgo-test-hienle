import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AppStackParamList } from "../navigation/AppNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/actions/movieAction";
import { debounce } from "../utils/input_utils";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, "MovieDetailScreen">;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch<any>();

  // TODO: SET TYPE
  const { movies } = useSelector((state: any) => state.movie);

  const [searchInput, setSearchInput] = useState<string>("a");
  const [movieList, setMovieList] = useState([...movies]);

  const onChangeSearchInput = (value: string) => {
    debounce(() => setSearchInput(value), 500);
  };

  const renderMovieRow = ({ item, index }: { item: any; index: number }) => {
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
    // TODO: Debounce
    dispatch(getAllMovies(searchInput));
  }, [searchInput]);

  useEffect(() => {
    setMovieList(movies);
  }, [movies]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imdbLogo}
        resizeMode="contain"
        source={{
          uri: "https://cdn.icon-icons.com/icons2/413/PNG/256/IMDB_41225.png",
        }}
      />
      <Text style={styles.findTxt}>Find your favourite movie and TV shows</Text>
      <TextInput
        style={styles.inputStyle}
        value={searchInput}
        onChangeText={onChangeSearchInput}
        placeholder="Search movies..."
      />
      <FlatList
        data={movieList}
        extraData={movieList}
        renderItem={renderMovieRow}
        contentContainerStyle={styles.contentList}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputStyle: {
    backgroundColor: Colors.alto,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
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
});
