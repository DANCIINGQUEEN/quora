import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({  //createSlice : 초기의 reducer 값을 전달받아서
  name: 'user',
  initialState: { //초기상태
    user:null,
  },
  reducers: {
    login: (state, action)=>{ //state : 기존에 내가 가지고있던 상태
      state.user=action.payload   //action : 로그인할때 정보들을 컴포넌트에서 받아오면 state.user 에 삽입
      //payload : json 으로 된 정보들을 현재 state 에 넣음
    },
    logout: (state) => {
      state.user=null
    },


  },
});


export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;  //state 의 user 의 payload 가 value

export default userSlice.reducer;
