import React from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView, Text } from "react-native";

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;


export default ({ navigation, route }) => {
    const { loading, data } = useQuery(POST_DETAIL, {
      variables: { id: route.params.id }
    });
    return (
      <ScrollView style={{backgroundColor: "#ffffff"}}>
        {loading ? (
          <Loader />
        ) : (
          data && data.seeFullPost && <Post {...data.seeFullPost} />
        )}
      </ScrollView>
    // <>
    // <Text>Photo</Text>
    // <Text>Photo</Text>
    // <Text>Photo</Text>
    // <Text>{`I should fetch for  ${route.params.id}`}</Text>
    // </>
    );
  };
  