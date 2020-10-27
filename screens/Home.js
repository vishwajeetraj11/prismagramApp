import React, { useState } from "react";
import styled from "styled-components";
import Loader from "../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { ScrollView, RefreshControl } from "react-native";
import Post from "../components/Post";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #ffffff;
`;

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      isLiked
      likeCount
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Text = styled.Text``;

export default () => {
  const [refreshing, setRefresh] = useState(false);

  const { data, loading, refetch } = useQuery(FEED_QUERY);
  // console.log(data)
  const refresh = async () => {
    try {
      setRefresh(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefresh(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
      style={{ backgroundColor: "#ffffff" }}
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
