import { createSlice } from '@reduxjs/toolkit';

export const questionSlice = createSlice({  //createSlice : 초기의 reducer 값을 전달받아서
    name: 'question',
    initialState: { //초기상태
        questionId:null,
        questionName:null,
    },
    reducers: {
        setQuestionInfo:(state, action)=>{
            state.questionId = action.payload.questionId
            state.questionName = action.payload.questionName
        }


    },
});


export const {setQuestionInfo } = questionSlice.actions;

export const selectQuestionId = (state) => state.question.questionId;   //firebase에 저장되어있는 퀘스쳔 아이디
export const selectQuestionName = (state) => state.question.questionName;

export default questionSlice.reducer;
