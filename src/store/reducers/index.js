import { combineReducers } from 'redux';
import quillReducer from './quillReducer';
import userInfoReducer from './userInfoReducer';
import classInfoReducer from './classInfoReducer';
import teacherInfoReducer from './teacherInfoReducer';

// 여러 reducer 하나로 묶어주는
const rootReducer = combineReducers({
  quill: quillReducer, // "quill"은 해당 리듀서의 이름
  userInfo: userInfoReducer,
  classInfo: classInfoReducer,
  teacherInfo: teacherInfoReducer,
});

export default rootReducer;