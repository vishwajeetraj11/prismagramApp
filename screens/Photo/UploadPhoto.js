import React, { useState } from "react";
import axios from "axios";
import { Image, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import constants from "../../constants";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../Home";
import Axios from "axios";

const View = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 0.4 * constants.width}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;
export default ({ navigation, route }) => {
  const [loading, setIsLoading] = useState(false);
  const photo = route.params.photo;
  const captionInput = useInput("");
  const locationInput = useInput("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }],
  });

  const handleSubmit = async () => {
    console.log("Submit");
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      // type: type.toLowerCase(),
      type: "image/jpeg",
      uri: photo.uri,
    });
    try {
      setIsLoading(true)
      const {
        data: { location },
      } = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setFileUrl(location);

        const {
        data: { upload }
      } = await uploadMutation({
        variables: {
          files: [location],
          caption: captionInput.value,
          location: locationInput.value
        }
      });

        if (upload.id) {
        navigation.navigate("TabNavigation");
      }

    } catch (e) {
      Alert.alert("Cant upload", "Try later");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload </Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};
