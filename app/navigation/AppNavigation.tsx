import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";

const AppNavigation = () => {
  const AppStack = createNativeStackNavigator();

  return (
    <NavigationContainer independent>
      <AppStack.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}
        initialRouteName={"HomeScreen"}
      >
        <AppStack.Screen name="HomeScreen" component={HomeScreen} />
        <AppStack.Screen
          name="MovieDetailScreen"
          component={MovieDetailScreen}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

export type AppStackParamList = {
  HomeScreen: undefined;
  MovieDetailScreen: { imdbId: string } | undefined;
};
