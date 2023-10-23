const combinedInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_ALL_INFO':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default combinedInfoReducer;