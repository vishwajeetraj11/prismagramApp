import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";
import styles from "../styles";
import {StatusBar} from 'react-native';

const SearchBar = ({ onChange, value, onSubmit }) => (
    <TextInput
      style={{
        width: constants.width-20,
        height: 40,
        backgroundColor: styles.lightGreyColor,
        padding: 10,
        borderRadius: 5,
        // marginTop: StatusBar.currentHeight+10,
        textAlign: "center",
      }}
      returnKeyType="search"
      onChangeText={onChange}
      onEndEditing={onSubmit}
      value={value}
      placeholder={"Search"}
      placeholderTextColor={styles.darkGreyColor}
    />
  );
  
  SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  };
  export default SearchBar;
  