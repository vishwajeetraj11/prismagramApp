import React from "react";
import {Text} from "react-native"
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import { ScrollView } from "react-native";
import UserProfile from "../components/UserProfile"

const GET_USER_BY_USERNAME = gql`
  query userByUsername($username: String!) {
    userByUsername(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;


export default ({ navigation, route }) => {
    const { loading, data } = useQuery(GET_USER_BY_USERNAME, {
      variables: { username: route.params.username }
    });
    return (
      <ScrollView style={{backgroundColor: "#ffffff"}}>
      {loading ? (
        <Loader />
      ) : (
        data && data.userByUsername && <UserProfile {...data.userByUsername} />
      )}
      </ScrollView>

    );
  };
  