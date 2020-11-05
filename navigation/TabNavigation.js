import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Notification from "../screens/Notifications";
import Search from "../screens/Search/Search";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import config from "./config";
import Detail from "../screens/Detail";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";

const activeColor = "#4285F4";
const InactiveColor = "#999999";
const Red = "#DB4437";

//MaterialCommunity Icons : you can chose to have  the icons with outlines and when active switch to filled version of icons

const TabNavigator = createBottomTabNavigator();

const HomeStackNavigator = createStackNavigator();

const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          ...config,
        },
      }}
    >
      <HomeStackNavigator.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerTitleAlign: "center",
          headerRight: () => <MessagesLink />,
          headerRightContainerStyle: {
            marginRight: 25,
            fontSize: 10,
          },
          headerTitle: () => (
            // <Image style={{height: 35}} resizeMode="contain" source={require("../assets/odin-small-circle-14.png")} />
            <Text
              style={{
                textTransform: "uppercase",
                letterSpacing: 4,
                fontSize: 20,
              }}
            >
              Prismagram
            </Text>
          ),
        }}
      />
      <HomeStackNavigator.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTintColor: "#393456",
          headerTitle: "Post",
        }}
      />
      <HomeStackNavigator.Screen
        name="UserDetail"
        component={UserDetail}
        options={({navigation, route}) => ({
          headerTintColor: "#393456",
          headerTitle: route.params.username,
        })}
      />
    </HomeStackNavigator.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator();

const ProfileStack = () => {
  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          ...config,
        },
      }}
    >
      <ProfileStackNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerTitleAlign: "center",
        }}
      />
      <ProfileStackNavigator.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTintColor: "#393456",
          headerTitle: "Post",
          // headerBackTitleVisible: false,
          // title: "Search",
          // headerTitleAlign: "center",
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
};
const NotificationStackNavigator = createStackNavigator();

const NotificationStack = () => {
  return (
    <NotificationStackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          ...config,
        },
      }}
    >
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
    <SearchStackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          ...config,
        },
        headerBackTitle: null,
        // header: () => {
        //   // console.log("\n");
        //   // console.log("\n");
        //   // console.log(props.scene.route.params);
        //   // console.log(props.navigation)
        //   // console.log(props.route.params);
        //   // console.log(props.scene.__memo[0].params.term);
        //   // const route = useRoute()
        //   // console.log(route.params);
        //   return (
        //     <SearchBar
        //       // value={null}
        //       // onChange={null}
        //       // onSubmit={null}
        //       value={route.params.term}
        //       onChange={route.params.onChange}
        //       onSubmit={route.params.onSubmit}
        //     />
        //   );
        // },
      }}
    >
      <SearchStackNavigator.Screen
        name="Search"
        component={Search}
        options={{
          title: "Search",
          headerTitleAlign: "center",
        }}
      />
      <SearchStackNavigator.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTintColor: "#393456",
          headerTitle: "Post",
          // headerBackTitleVisible: false,
          // title: "Search",
          // headerTitleAlign: "center",
        }}
      />
      <SearchStackNavigator.Screen
        name="UserDetail"
        component={UserDetail}
        options={{
          headerTintColor: "#393456",
          headerTitle: "Profile",
          // headerBackTitleVisible: false,
          // title: "Search",
          // headerTitleAlign: "center",
        }}
      />
    </SearchStackNavigator.Navigator>
  );
};

export default function TabNavigatorMain() {
  return (
    <TabNavigator.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, paddingBottom: 4 },
        showLabel: false,
        style: {
          ...config,
        },
      }}
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = Platform.OS === "ios" ? "ios-home" : "md-home";
          } else if (route.name === "Profile") {
            iconName = Platform.OS === "ios" ? "ios-person" : "md-person";
          } else if (route.name === "Notification") {
            iconName =
              Platform.OS === "ios"
                ? focused
                  ? "ios-heart"
                  : "ios-heart-empty"
                : focused
                ? "md-heart"
                : "md-heart-empty";
          } else if (route.name === "Search") {
            iconName = Platform.OS === "ios" ? "ios-search" : "md-search";
          } else if (route.name === "Add") {
            iconName =
              Platform.OS === "ios"
                ? "ios-add-circle-outline"
                : "md-add-circle-outline";
          }
          return (
            <NavIcon
              name={iconName}
              size={26}
              color={
                focused
                  ? route.name === "Notification"
                    ? Red
                    : activeColor
                  : InactiveColor
              }
            />
          );
        },
      })}
    >
      <TabNavigator.Screen
        name="Home"
        component={HomeStack}
        // options={{
        //   tabBarIcon: () => <NavIcon name="logo-instagram" size={36} />,
        // }}
      />
      <TabNavigator.Screen name="Search" component={SearchStack} />
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
      <TabNavigator.Screen name="Profile" component={ProfileStack} />
    </TabNavigator.Navigator>
  );
}
