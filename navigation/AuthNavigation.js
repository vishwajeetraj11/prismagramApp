import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Signup from "../screens/Auth/Signup"
import Confirm from "../screens/Auth/Confirm"
import Login from "../screens/Auth/Login"
import AuthHome from "../screens/Auth/AuthHome"

const AuthNavigation = createStackNavigator();

function MyStack() {
    return (
      <AuthNavigation.Navigator headerMode="none">
      <AuthNavigation.Screen name="AuthHome" component={AuthHome} />
      <AuthNavigation.Screen name="Signup" component={Signup} />
      <AuthNavigation.Screen name="Login" component={Login} />
      <AuthNavigation.Screen name="ConfirmSecret" component={Confirm} />
      </AuthNavigation.Navigator>
    );
  }

  export default function AuthNavigationMain() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
