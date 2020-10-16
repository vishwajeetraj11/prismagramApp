import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation"

const MainNavigation = createStackNavigator();

function MyStack() {
  return (
    <MainNavigation.Navigator headerMode="none">
    <MainNavigation.Screen name="TabNavigation" component={TabNavigation} />
    <MainNavigation.Screen
      name="PhotoNavigation"
      component={PhotoNavigation}
    />
    <MainNavigation.Screen
      name="MessageNavigation"
      component={MessageNavigation}
    />
      </MainNavigation.Navigator>
  );
}

export default function MainNavigationMain() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
