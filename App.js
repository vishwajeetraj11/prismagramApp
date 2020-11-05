import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";
import * as  SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import apolloClientOptions from "./apollo";
import { ThemeProvider } from "styled-components";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";

// adb reverse tcp:4000 tcp:4000
import {
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    // await AsyncStorage.clear();

    let customFonts = {
      Lato_100Thin,
      Lato_300Light,
      Lato_400Regular,
      Lato_700Bold,
      Lato_900Black,
    };

    try {
      // await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        ...Ionicons.font,
        ...customFonts,
      });
      await Asset.loadAsync([require("./assets/logo.png")]);

      const cache = new InMemoryCache();

      // await before instantiating ApolloClient, else queries might run before the cache is persisted
      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      const client = new ApolloClient({
        cache,
        request: async (operation) => {
          const TOKEN = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            headers: { Authorization: `Bearer ${TOKEN}` },
          });
        },
        ...apolloClientOptions,
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn == "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setLoaded(true);
      setClient(client);
      // await SplashScreen.hideAsync();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  // console.log(loaded, " ", isLoggedIn, )

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
