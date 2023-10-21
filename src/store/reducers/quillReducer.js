const initialState = {
  quillValue: '', // 초기값은 빈 문자열
};

const quillReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_QUILL_VALUE':  // action 상수가 중복 될 수 있으니 파일이름 추가
      return {
        ...state,
        quillValue: action.payload
      };
    default:
      return state;
  }
};

export default quillReducer;
