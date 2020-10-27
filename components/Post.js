import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Image, Platform, View } from "react-native";
import Swiper from "react-native-swiper";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import { gql } from "apollo-boost";
import {useMutation} from "react-apollo-hooks"
export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
const Post = ({id, user, location, files = [], likeCount: likeCountProp, caption, comments, isLiked: isLikedProp, }) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id
    }
  });

  const handleLike = async() => {
    if (isLiked === true) {
      setLikeCount(l => l - 1);
    } else {
      setLikeCount(l => l + 1);
    }
    setIsLiked(p => !p);
    try {
      const data = await toggleLikeMutaton();
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable>
          <Bold>{user.username}</Bold>
          <Location>{location}</Location>
        </Touchable>
      </Header>
      <Swiper
        showsPagination={false}
        dot={
          <View
            style={{
              backgroundColor: "rgba(255,255,255,.3)",
              width: 10,
              height: 10,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: "#fff",
              width: 13,
              height: 13,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        loop={false}
        index={0}
        paginationStyle={{
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          height: 13,
        }}
        style={{ height: constants.height / 2.5 }}
      >
        {files.map((file) => (
          <Image
            key={file.id}
            style={{ height: constants.height / 2.5, width: constants.width }}
            source={{ uri: file.url }}
            resizeMode="contain"
          />
        ))}
      </Swiper>
      <InfoContainer>
      <IconsContainer>
        <Touchable onPress={handleLike}>
          <IconContainer>
            <Ionicons
              size={26}
              color={isLiked ? styles.redColor : styles.blackColor}
              name={
                Platform.OS === "ios"
                ? isLiked
                  ? "ios-heart"
                  : "ios-heart-empty"
                : isLiked
                ? "md-heart"
                : "md-heart-empty"
              }
            />
          </IconContainer>
        </Touchable>
        <Touchable>
          <IconContainer>
            <Ionicons
              size={26}
              name={Platform.OS === "ios" ? "ios-text" : "md-text"}
            />
          </IconContainer>
        </Touchable>
      </IconsContainer>
      <Touchable>
      <Likes>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Likes>
    </Touchable>
    <Touchable>
        <Caption>
          <Bold>{user.username}</Bold> {" "} {caption}
        </Caption>
    </Touchable>
          {
            comments.length !== 0 ?<Touchable><CommentCount>See all {comments.length} comments</CommentCount></Touchable> : undefined
          } 
      </InfoContainer>
    </Container>
  );
};


const Container = styled.View``;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const Bold = styled.Text`
  font-family: "Lato_700Bold";
  letter-spacing: 0.3px;
  margin-left: 10px;
`;
const Likes = styled(Bold)`
  margin-left: 0;
`
const Location = styled.Text`
  margin-left: 10px;
  font-size: 12px;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;
const InfoContainer = styled.View`
  padding: 10px;
`;
const Caption = styled.Text`
  margin: 5px 0px;
`;
const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string,
  location: PropTypes.string,
};

export default Post;
