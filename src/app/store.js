import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import questionReducer from '../features/questionSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    question:questionReducer
  },
});

//store 란 state값들을 저장하는 장소
//reducer에서 전달받은  action을 redux의 dispatch함수를 사용하여 store로 전달
//store는 createStore를 통해서 만들수 있고
//createStore안에 reducer역할을 하는 함수가 들어가야한다