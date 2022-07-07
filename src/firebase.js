// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// After: version 9 compat
// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
//firebase 가 업데이트 됨에 따라 import 하는 코드가 추가됨

const firebaseConfig = {
    apiKey: "AIzaSyAUKHSHe7xMCt9n_O1_kDVlPa0pot3WewU",
    authDomain: "quora-4ec5c.firebaseapp.com",
    projectId: "quora-4ec5c",
    storageBucket: "quora-4ec5c.appspot.com",
    messagingSenderId: "881999710872",
    appId: "1:881999710872:web:037ab73724aa1136381eed",
    measurementId: "G-HDF94TKX0K"
};
const firebaseApp=firebase.initializeApp(firebaseConfig)

const auth=firebase.auth()  //로그인

const provider=new firebase.auth.GoogleAuthProvider()   //구글로그인창

const db=firebaseApp.firestore()    //데이터베이스

export {auth, provider}

export default  db

//export 와 export default 차이
//export : 한개의 선언에서 여러개를 다른 컴포넌트에서 import 해올수있다
//export default : 오로지 한개의 모듈만들 가져옴
// export 과일 => import {사과, 바나나, 딸기} from './과일'
//export default 직선 => import 직선 from '직선'