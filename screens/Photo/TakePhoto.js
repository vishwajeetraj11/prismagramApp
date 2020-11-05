import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles";
import * as MediaLibrary from "expo-media-library";


const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
`;
const Icon = styled.View``;
const Text = styled.Text``;

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 10px solid ${styles.lightGreyColor};
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const[canTakePhoto, setCanTakePhoto] = useState(true)

  const takePhoto = async() => {
    if(!canTakePhoto) {
      return
    }
    try {
      setCanTakePhoto(false);
      const {uri} = await cameraRef.current.takePictureAsync({
        quality: 1,
      })
      const asset = await MediaLibrary.createAssetAsync(uri);
      navigation.navigate("UploadPhoto", {photo: asset})
    } catch(e) {
      console.log(e)
      setCanTakePhoto(true);
    }
  }

  const cameraRef = useRef();

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };


  useEffect(() => {
    askPermission();
    // console.log(cameraRef.getSupportedRatiosAsync())
  }, []);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <>
        <Camera
          ref={cameraRef}
          ratio={"4:3"}
          type={cameraType}
          style={{
         justifyContent: "flex-end",
          padding: 15,
          width: constants.width,
          height: constants.height / 2,
         }}
        >
        <TouchableOpacity onPress={toggleType}>
              <Icon>
                <Ionicons
                  name={
                    Platform.OS === "ios"
                      ? "ios-reverse-camera"
                      : "md-reverse-camera"
                  }
                  size={32}
                  color={"white"}
                />
              </Icon>
            </TouchableOpacity>
          </Camera>
          <View>
          <TouchableOpacity disabled={!canTakePhoto} onPress={takePhoto}>
            <Button />
          </TouchableOpacity>
        </View>
          </>
      ) : null}
    </View>
  );
};
