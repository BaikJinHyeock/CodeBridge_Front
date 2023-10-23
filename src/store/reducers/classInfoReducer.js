const classInfoReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CLASS_INFO':
      return action.payload || state;
    default:
      return state;
  }
};

export default classInfoReducer;
