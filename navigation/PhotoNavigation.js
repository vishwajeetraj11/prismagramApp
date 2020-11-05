import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { Dimensions } from "react-native";
import { StatusBar } from "react-native";
import config from "./config";
import styles from "../styles";

const Photo = createMaterialTopTabNavigator();

function PhotoTabs() {
  return (
    <Photo.Navigator
      tabBarPosition="bottom"
      // style={{
      //   backgroundColor: "#fafafa"
      // }}
      tabBarOptions={{
        style: {
          // marginTop: StatusBar.currentHeight
          ...config,
        },
        labelStyle: {
          fontFamily: "Lato_400Regular",
        },
        indicatorStyle: {
          backgroundColor: styles.blackColor,
        },
      }}
    >
      <Photo.Screen
        name="SelectPhoto"
        options={{ tabBarLabel: "Select" }}
        component={SelectPhoto}
      />
      <Photo.Screen
        name="TakePhoto"
        options={{ tabBarLabel: "Take" }}
        component={TakePhoto}
      />
    </Photo.Navigator>
  );
}

const PhotoNavigation = createStackNavigator();

function MyStack() {
  return (
    <PhotoNavigation.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fafafa",
        },
        headerTitle: 'Choose a Photo'
      }}
    >
      <PhotoNavigation.Screen
        name="PhotoTabs"
        component={PhotoTabs}
        // Just in case if i later wanted to hide the header
        // options={{ headerShown: false }}
      />
      <PhotoNavigation.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{ headerShown: true, headerTitle: "Upload", headerBackTitleStyle: {textAlign: "center"} }}
      />
    </PhotoNavigation.Navigator>
  );
}

// function PhotoNavigationMain() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }

export default MyStack;
