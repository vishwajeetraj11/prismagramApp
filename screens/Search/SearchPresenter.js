import React, { useEffect } from "react"
import styled from "styled-components";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";


export const SEARCH = gql`
    query search($term: String!){
        searchPost(term: $term) {
        id
        files{
            id
            url
        }
        likeCount
        commentCount
    }
    }
`

const SearchPresenter = ({term, fetch}) =>{
    // const {data, loading} = useQuery();
    useEffect(() => {
        if(fetch === true) {
            console.log("now we fetch");
        }
    },[fetch])
    return (
        null
    )
} 

SearchPresenter.propTypes = {
    term: PropTypes.string.isRequired,
    fetch: PropTypes.bool.isRequired
};

export default SearchPresenter;