import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../components/UserProfile";

export const PROFILE = gql`
  {
    seeMyProfile {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(PROFILE);
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeMyProfile && <UserProfile {...data.seeMyProfile} />
      )}
    </ScrollView>
  );
};
