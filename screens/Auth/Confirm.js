import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useIsLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #ffffff;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const confirmInput = useInput("");
  // hooks can only be used inside the body of a functional component.
  const LogIn = useIsLogIn();
  const [loading, setloading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: route.params.email,
      secret: confirmInput.value,
    },
  });


  const handleConfirm = async () => {
    const { value } = confirmInput;

    if(value === "" || !value.includes(" ")){
      return Alert.alert("Invalid secret");
    }

    try {
      setloading(true);
      const {data: {confirmSecret: token}} = await confirmSecretMutation();
      if(token !== "" || token !== false) {
       LogIn(token)
        return;
      } else {
      Alert.alert("Wrong Secret!")
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't Confirm Secret");
    } finally {
      setloading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Enter Secret"
          returnKeyType={"send"}
          autoCorrect={false}
          onSubmitEditing={handleConfirm}
        />
        <AuthButton onPress={handleConfirm} text={"Confirm"} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
