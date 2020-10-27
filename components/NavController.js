import React, { useContext } from "react";
import { Text, View,TouchableOpacity } from "react-native";
import { useIsLoggedIn, useIsLogIn, useIsLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation"
import MainNavigation from "../navigation/MainNavigation"
import styled from "styled-components"

export default () => {
  // const isLoggedIn = useIsLoggedIn();
  const isLoggedIn = useIsLoggedIn();
  const LogIn = useIsLogIn();
  const logOut = useIsLogOut();


  return (
    <>
      <View
        style={{
          flex: 1
        }}
      >
        {
          isLoggedIn ? (
            <MainNavigation />
          ) : (
            <AuthNavigation />
          )
        }
      </View>
    </>
  );
};
