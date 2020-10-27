import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import NavIcon from "./NavIcon";
import { Platform } from "react-native";

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;

export default () => {
  const navigation = useNavigation();
  return (
    <Container
      onPress={() => {
        navigation.navigate("MessageNavigation");
      }}
    >
    <NavIcon
      name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"}
    />
    </Container>
  );
};
