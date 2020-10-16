import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Message from "../screens/Messages/Message"
import Messages from "../screens/Messages/Messages"

const MessageNavigation = createStackNavigator();

function MyStack() {
  return (
    <MessageNavigation.Navigator headerMode="none">
    <MessageNavigation.Screen name="Messages" component={Messages} />
    <MessageNavigation.Screen name="Message" component={Message} />
      </MessageNavigation.Navigator>
  );
}

export default MyStack;

// function MessageNavigationMain() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }