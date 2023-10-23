const classInfoReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_CLASS_INFO':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default classInfoReducer;
  