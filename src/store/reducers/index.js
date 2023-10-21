import { combineReducers } from 'redux';
import quillReducer from './quillReducer';

// 여러 reducer 하나로 묶어주는
const rootReducer = combineReducers({
  quill: quillReducer, // "quill"은 해당 리듀서의 이름
});

export default rootReducer;