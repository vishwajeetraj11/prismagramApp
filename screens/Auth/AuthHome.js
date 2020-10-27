import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import constants from "../../constants";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #fff;
`;


const Image = styled.Image`
  width: ${constants.width / 1.2}px;
  height: ${constants.height / 3}px;
`;

const Text = styled.Text``;

const ButtonContainer = styled.TouchableOpacity`
  margin-bottom: 20px;
`;
const Button = styled.View`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px 20px;
  border-radius: 20px;
  width: ${constants.width / 2}px;
`;
const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 13px;
  font-weight: 900;
`;

const Touchable = styled.TouchableOpacity`
  margin-top: 20px;
  /* border: 2px solid ${(props) => props.theme.blueColor}; */
  width: ${constants.width / 2}px;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 4px;
  elevation: 5;
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
  font-size: 13px;
  text-align: center;
`;

export default ({ navigation }) => (
  <View>
    <Image resizeMode={"contain"} source={require("../../assets/loog-small.png")} />
    <AuthButton
      text={"Create New Account"}
      onPress={() => navigation.navigate("Signup")}
    />
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log in</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
