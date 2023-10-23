const teacherInfoReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_TEACHER_INFO':
      return action.payload || state; // action.payload가 정의되지 않았을 때 이전 상태를 반환
    default:
      return state;
  }
};

export default teacherInfoReducer;
