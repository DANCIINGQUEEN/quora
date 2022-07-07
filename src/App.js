import React, {useEffect} from 'react';
import './App.css';
import Quora from "./Quora";
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./features/userSlice";
import Login from "./Login";
import {auth} from "./firebase";

function App() {
    //현재 state에 user에 대한 정보를 얻고싶어서
    const user=useSelector(selectUser)    //redux의 상태값을 조회하기위한 hook함수
    //user의 login여부를 app전체에 알려줘야함
    const dispatch=useDispatch()


    //user 동기화 =>  로그인 했음을 앱 전역에 동기화
    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                dispatch(login({
                    uid:authUser.uid,
                    photo:authUser.photoURL,
                    displayName:authUser.displayName,
                    email:authUser.email
                }))
                console.log(authUser)
            }else{
                dispatch(logout())
            }
        })
    }, [dispatch])
  return (
    <div className="App">
        {
            user?(<Quora/>):(<Login/>)  //삼항조건문
        }
    </div>
  );
}

export default App;
