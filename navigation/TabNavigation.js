import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Notification from "../screens/Notifications";
import Search from "../screens/Search";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesLink from "../components/MessagesLink";

const TabNavigator = createBottomTabNavigator();

const HomeStackNavigator = createStackNavigator();

const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerTitleAlign: "center",
          headerRight: () => (
            <MessagesLink />
          ),
          headerRightContainerStyle: {
            marginRight: 10,
            fontSize: 10
          }
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator();

const ProfileStack = () => {
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerTitleAlign: "center",
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
};
const NotificationStackNavigator = createStackNavigator();

const NotificationStack = () => {
  return (
    <NotificationStackNavigator.Navigator>
      <NotificationStackNavigator.Screen
        name="Notification"
        component={Notification}
        options={{
          title: "Notification",
          headerTitleAlign: "center",
        }}
      />
    </NotificationStackNavigator.Navigator>
  );
};
const SearchStackNavigator = createStackNavigator();

const SearchStack = () => {
  return (
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen
        name="Search"
        component={Search}
        options={{
          title: "Search",
          headerTitleAlign: "center",
        }}
      />
    </SearchStackNavigator.Navigator>
  );
};

export default function TabNavigatorMain() {
  return (
    <TabNavigator.Navigator
      tabBarOptions={{ labelStyle: { fontSize: 12, paddingBottom: 4 } }}
    >
      <TabNavigator.Screen name="Home" component={HomeStack} />
      <TabNavigator.Screen name="Profile" component={ProfileStack} />
      <TabNavigator.Screen
        name="Add"
        component={View}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate("PhotoNavigation");
          },
        })}
      />
      <TabNavigator.Screen name="Notification" component={NotificationStack} />
      <TabNavigator.Screen name="Search" component={SearchStack} />
    </TabNavigator.Navigator>
  );
}
