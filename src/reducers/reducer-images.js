
import React from 'react';
import { GET_IMAGES } from '../actions/index';


const INITIAL_STATE = []  ;

export default function ImagesReducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case GET_IMAGES:
      return action.payload.data;

    default:
      return state;
  }
}
