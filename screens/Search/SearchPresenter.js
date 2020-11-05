import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import PropTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import SquarePost from "../../components/squarePost";

const PostContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

const SearchPresenter = ({ term, fetch }) => {
  const [refresh, setRefresh] = useState(false);

  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term,
    },
    skip: !fetch,
    fetchPolicy: "network-only"
  });
  const onRefresh = async () => {
    try {
      setRefresh(true);
      await refetch({ variables: { term } });
    } catch (e) {
    } finally {
      setRefresh(false);
    }
  };

  return (
    <ScrollView
        style={{backgroundColor: "#ffffff"}}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
      }
    >
    <PostContainer>{loading ? (
      <Loader />
    ) : (
      data &&
      data.searchPost &&
      data.searchPost.map((post) => <SquarePost key={post.id} {...post} />)
    )}</PostContainer>
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  fetch: PropTypes.bool.isRequired,
};

export default SearchPresenter;
