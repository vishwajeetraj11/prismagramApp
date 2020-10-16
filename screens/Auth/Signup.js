import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
`;

const GoogleContainer = styled.View`
  margin-top: 20px;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const usernameInput = useInput("");
  const emailValue =
    route && route.params && route.params.email ? route.params.email : "";
  const emailInput = useInput(emailValue);
  const [loading, setloading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: emailInput.value,
      username: usernameInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
    },
  });

  const updateFormData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    firstNameInput.setValue(firstName);
    lastNameInput.setValue(lastName);
    const [username] = email.split("@");
    usernameInput.setValue(username);
  };

  // Handle Google Login Function
  const googleLogin = async() => {
    const iOS_ID = "1020747490677-u1v4s41u49c06n9vnd2vufidnclrcv5u.apps.googleusercontent.com";
    const Android_ID = "1020747490677-e4c3068feluohi0mp9f047as528dlbvo.apps.googleusercontent.com";
    try{
      setloading(true);
      const result = await Google.logInAsync({
        androidClientId: Android_ID,
        iosClientId: iOS_ID,
        scopes: ["profile", "email"]
      })

      if (result.type === 'success') {
        let user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });

        const { email, family_name, given_name } = await user.json();
        updateFormData(email, given_name, family_name);

        return result.accessToken;
      } else {
        return { cancelled: true };
      }

    } catch(e) {
      console.log(e)
    } finally {
      setloading(false)
    }

  }

  // Handle FBLogin Function
  const fbLogin = async () => {
    try {
      setloading(true)
      await Facebook.initializeAsync({
        appId: "800642054046107",
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const { email, first_name, last_name } = await response.json();
        // emailInput.setValue(email);
        // firstNameInput.setValue(first_name);
        // lastNameInput.setValue(last_name);
        updateFormData(email, first_name, last_name);
        setloading(false)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  // Handle SignUp Function
  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: firstName } = firstNameInput;
    const { value: lastName } = lastNameInput;
    const { value: username } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }

    if (firstName === "") {
      return Alert.alert("First Name can't be empty");
    }

    if (username === "") {
      return Alert.alert("Username can't be empty");
    }

    try {
      setloading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
        return;
      }
    } catch (e) {
      // console.log(e);
      Alert.alert("Username Already Exists!", "Log in Instead.");
      navigation.navigate("Login", { email });
    } finally {
      setloading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <View>
          <AuthInput
            {...firstNameInput}
            placeholder="First Name"
            returnKeyType={"send"}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <AuthInput
            {...lastNameInput}
            placeholder="Last Name"
            autoCapitalize="words"
            returnKeyType={"send"}
            autoCorrect={false}
          />
          <AuthInput
            {...emailInput}
            placeholder="Email Address"
            keyboardType={"email-address"}
            returnKeyType={"send"}
            autoCorrect={false}
          />
          <AuthInput
            {...usernameInput}
            placeholder="Username"
            returnKeyType={"send"}
            autoCorrect={false}
          />
          <AuthButton
            onPress={handleSignup}
            text={"Sign Up"}
            loading={loading}
          />
          <FBContainer>
            <AuthButton
              bgColor={"#2D4DA7"}
              loading={false}
              onPress={fbLogin}
              text="Login with Facebook"
            />
          </FBContainer>

          <GoogleContainer>
            <AuthButton
              bgColor={"#EE1922"}
              loading={false}
              onPress={googleLogin}
              text="Login with Google"
            />
          </GoogleContainer>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};
