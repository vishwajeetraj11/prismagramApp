import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar"
import SearchPresenter from "./SearchPresenter"


const Text = styled.Text``;

export default ({ navigation, route }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetch, setFetch] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar
          onChange={handleOnChange}
          value={searchTerm}
          onSubmit={handleSubmit}
        />
      )
    });
  },[navigation, searchTerm])

  const handleSubmit = () => {
    setFetch(true);
  };
  const handleOnChange = text => {
    setSearchTerm(text);
    setFetch(false);
  };

  return (
    <SearchPresenter term={searchTerm} fetch={fetch} />
  );
};
