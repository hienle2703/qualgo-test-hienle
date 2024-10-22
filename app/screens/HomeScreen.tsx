import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AppStackParamList } from "../navigation/AppNavigation";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, "MovieDetailScreen">;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [movies, setMovies] = useState(data_fetched);

  const onChangeSearchInput = (value: string) => setSearchInput(value);

  const renderMovieRow = ({ item, index }: { item: any; index: number }) => {
    const { title, img_poster } = item || {};

    console.log(item, "================= item");

    const goToMovieDetail = () =>
      navigation.navigate("MovieDetailScreen", { imdbId: item });
    return (
      <TouchableOpacity
        key={`keyMovie ${index}`}
        style={styles.movieRow}
        onPress={goToMovieDetail}
      >
        <Image
          style={styles.squaredPoster}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc35tyke0tV6bbmJKNG1spZyJaRO-w-vJecQ&s",
          }}
          resizeMode="cover"
        />
        <View style={styles.infoColumn}>
          <Text style={styles.movieTitle}>Joker 1 (1977)</Text>
          <Text style={styles.actors}>
            Greta Scacchi, Vincent D'Onofrio, ...
          </Text>
        </View>
        <Text style={styles.actors}>#{46967}</Text>
      </TouchableOpacity>
    );
  };

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
        data={movies}
        extraData={movies}
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

const data_fetched = [
  {
    "#TITLE": "Desire",
    "#YEAR": 2011,
    "#IMDB_ID": "tt1879030",
    "#RANK": 3006,
    "#ACTORS": "Déborah Révy, Hélène Zimmer",
    "#AKA": "Desire (2011) ",
    "#IMDB_URL": "https://imdb.com/title/tt1879030",
    "#IMDB_IV": "https://IMDb.iamidiotareyoutoo.com/title/tt1879030",
    "#IMG_POSTER":
      "https://m.media-amazon.com/images/M/MV5BMjFjOGE0NzktODg5NC00Y2QyLWIzZWQtYWRmZmE3ZjU2MTE5XkEyXkFqcGc@._V1_.jpg",
    photo_width: 2000,
    photo_height: 3000,
  },
  {
    "#TITLE": "Hotel Desire",
    "#YEAR": 2011,
    "#IMDB_ID": "tt2080323",
    "#RANK": 1005,
    "#ACTORS": "Saralisa Volm, Clemens Schick",
    "#AKA": "Hotel Desire (2011) ",
    "#IMDB_URL": "https://imdb.com/title/tt2080323",
    "#IMDB_IV": "https://IMDb.iamidiotareyoutoo.com/title/tt2080323",
    "#IMG_POSTER":
      "https://m.media-amazon.com/images/M/MV5BMjBmM2YwNmYtOTZkYy00MDViLTgxY2UtYzViYjY5YjA0ZGFlXkEyXkFqcGc@._V1_.jpg",
    photo_width: 833,
    photo_height: 1181,
  },
  {
    "#TITLE": "Dark Desire",
    "#YEAR": 2020,
    "#IMDB_ID": "tt12540080",
    "#RANK": 3390,
    "#ACTORS": "Maite Perroni, Erik Hayser",
    "#AKA": "Dark Desire (2020) ",
    "#IMDB_URL": "https://imdb.com/title/tt12540080",
    "#IMDB_IV": "https://IMDb.iamidiotareyoutoo.com/title/tt12540080",
    "#IMG_POSTER":
      "https://m.media-amazon.com/images/M/MV5BZjY0ODM3NTItYjIxNC00OTdkLTg3NzQtNDQwN2M2ZWVkZGUxXkEyXkFqcGc@._V1_.jpg",
    photo_width: 1142,
    photo_height: 1600,
  },
  {
    "#TITLE": "Desire",
    "#YEAR": 2017,
    "#IMDB_ID": "tt7308086",
    "#RANK": 15503,
    "#ACTORS": "Carolina Ardohain, Mónica Antonópulos",
    "#AKA": "Desire (2017) ",
    "#IMDB_URL": "https://imdb.com/title/tt7308086",
    "#IMDB_IV": "https://IMDb.iamidiotareyoutoo.com/title/tt7308086",
    "#IMG_POSTER":
      "https://m.media-amazon.com/images/M/MV5BNmJjZGM5N2UtNzkyMi00OGMxLTljYjktZTI4M2MzY2EyYmRmXkEyXkFqcGc@._V1_.jpg",
    photo_width: 840,
    photo_height: 1200,
  },
  {
    "#TITLE": "Wings of Desire",
    "#YEAR": 1987,
    "#IMDB_ID": "tt0093191",
    "#RANK": 4945,
    "#ACTORS": "Bruno Ganz, Solveig Dommartin",
    "#AKA": "Wings of Desire (1987) ",
    "#IMDB_URL": "https://imdb.com/title/tt0093191",
    "#IMDB_IV": "https://IMDb.iamidiotareyoutoo.com/title/tt0093191",
    "#IMG_POSTER":
      "https://m.media-amazon.com/images/M/MV5BYTUwY2EyMDktMGI0Ny00MDNlLWE0ODMtZWIwOGNhNmY1OWIwXkEyXkFqcGc@._V1_.jpg",
    photo_width: 1924,
    photo_height: 3000,
  },
  {
    "#TITLE": "A Streetcar Named Desire",
    "#YEAR": 1951,
    "#IMDB_ID": "tt0044081",
    "#RANK": 5267,
    "#ACTORS": "Vivien Leigh, Marlon Brando",
    "#AKA": "A Streetcar Named Desire (1951) ",
    "#IMDB_URL": "https://imdb.com/title/tt0044081",
    "#IMDB_IV": "https://IMDb.iamidiotareyoutoo.com/title/tt0044081",
    "#IMG_POSTER":
      "https://m.media-amazon.com/images/M/MV5BNTdmZDY1ODQtNzFjYy00MGM4LWJmNDItN2MxMmQ2OTgxZGNmXkEyXkFqcGc@._V1_.jpg",
    photo_width: 991,
    photo_height: 1500,
  },
  {
    "#TITLE": "Desire",
    "#YEAR": 1992,
    "#IMDB_ID": "tt0105306",
    "#RANK": 46967,
    "#ACTORS": "Greta Scacchi, Vincent D'Onofrio",
    "#AKA": "Desire (1992) ",
    "#IMDB_URL": "https://imdb.com/title/tt0105306",
    "#IMDB_IV": "https://IMDb.iamidiotareyoutoo.com/title/tt0105306",
    "#IMG_POSTER":
      "https://m.media-amazon.com/images/M/MV5BMTY4NzE4Mjg0NV5BMl5BanBnXkFtZTcwNTEzOTQxMQ@@._V1_.jpg",
    photo_width: 330,
    photo_height: 475,
  },
  {
    "#TITLE": "That Obscure Object of Desire",
    "#YEAR": 1977,
    "#IMDB_ID": "tt0075824",
    "#RANK": 10167,
    "#ACTORS": "Fernando Rey, Carole Bouquet",
    "#AKA": "That Obscure Object of Desire (1977) ",
    "#IMDB_URL": "https://imdb.com/title/tt0075824",
    "#IMDB_IV": "https://IMDb.iamidiotareyoutoo.com/title/tt0075824",
    "#IMG_POSTER":
      "https://m.media-amazon.com/images/M/MV5BYTcwNjY3OTAtODNmYy00OTZlLWE0YmMtMGEwYmRmNjNiMmE5XkEyXkFqcGc@._V1_.jpg",
    photo_width: 2544,
    photo_height: 4004,
  },
];
