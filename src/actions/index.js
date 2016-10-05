
import React from 'react';
import axios from 'axios';


const CODE_URL = 'https://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions';
const IMAGE_URL = 'http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_compiler_image';

export const FETCH_CODE_SUBMISSIONS = 'FETCH_CODE_SUBMISSIONS';
export const FILTER_CODE_LIST = 'FILTER_CODE_LIST';
export const SEARCH_CODE = 'SEARCH_CODE';

export const GET_IMAGES = 'GET_IMAGES';





export function fetchCodeSubs(pageNum) {

  const url = `${CODE_URL}&page=${pageNum}`;
  const request = axios.get(url);
  return ({
    type: FETCH_CODE_SUBMISSIONS,
    payload: request
  });

}

export function filterCode(key) {
  console.log(key);
  return ( {
    type : FILTER_CODE_LIST,
    payload : key
  });
}

export function getImages() {
  const url = `${IMAGE_URL}`;
  const request = axios.get(url);
  return ( {
    type : GET_IMAGES,
    payload : request
  });
}


export function searchCode(term) {
  return( {
    type: SEARCH_CODE,
    payload: term
  })
}
