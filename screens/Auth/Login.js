import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #ffffff;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const emailValue = route && route.params && route.params.email ? route.params.email : "";
  const email = useInput(emailValue);
  const [loading, setloading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: email.value,
    },
  });

  const handleLogin = async () => {
    const { value } = email;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (value === "") {
      return Alert.alert("Email can't be empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("Please enter a valid email");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("That email is invalid");
    }
    try {
      setloading(true);
      const {data:{requestSecret}} = await requestSecretMutation();
      if(requestSecret) {
        Alert.alert("Check your email");
        navigation.navigate("ConfirmSecret", {email: value});
        return;
      } else {
        Alert.alert("Account not found");
        navigation.navigate("Signup", {email: value})
      }
    } catch (e) {
      // console.log(e);
      Alert.alert("Can't Log In now");
    } finally {
      setloading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...email}
          placeholder="Enter your Email"
          keyboardType={"email-address"}
          returnKeyType={"send"}
          autoCorrect={false}
          onSubmitEditing={handleLogin}
        />
        <AuthButton onPress={handleLogin} text={"Log In"} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
