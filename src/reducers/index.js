import { combineReducers } from 'redux';
import CodeListReducer from './reducer-codeList';
import ImagesReducer from './reducer-images';


const rootReducer = combineReducers({
  codeList: CodeListReducer,
  images: ImagesReducer
});

export default rootReducer;
