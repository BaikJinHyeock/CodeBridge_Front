// userInfoActions.js
export const updateUserInfo = (userInfo) => ({
  type: 'SET_USER_INFO',
  payload: userInfo
});

// 다른 액션들도 정의할 수 있습니다.
// export const someOtherAction = (payload) => ({
//   type: 'SOME_OTHER_ACTION',
//   payload
// });
