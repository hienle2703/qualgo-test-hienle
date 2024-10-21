import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetailScreen = ({ navigation, route }) => {
  const { movie } = route.params;

  console.log("movie", movie);
  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Image
            resizeMode="contain"
            source={require("../../assets/images/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avenger: End Game</Text>
      </View>
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
    paddingHorizontal: 20,
    width: "100%",
    paddingVertical: 10,
  },
  backIcon: {
    height: 20,
    aspectRatio: 1,
  },
  backBtn: {
    position: "absolute",
    left: 10,
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
