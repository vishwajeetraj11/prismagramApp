import React, { useState, useContext, createContext } from "react";
import  AsyncStorage  from "@react-native-community/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

  const logUserIn = async (token) => {
    try {
      
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
  <AuthContext.Provider value={{isLoggedIn, logUserIn, logUserOut}}>
  {children}
  </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const {isLoggedIn} = useContext(AuthContext)
  return isLoggedIn
}

export const useIsLogIn = () => {
  const {logUserIn} = useContext(AuthContext)
  return logUserIn
}

export const useIsLogOut = () => {
  const {logUserOut} = useContext(AuthContext)
  return logUserOut
}