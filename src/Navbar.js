import React, {useState} from 'react';
import './Navbar.css'
import {
    AssignmentIndOutlined,
    BorderAllRounded, ExpandMore,
    Home, Language, Link,
    NotificationsOutlined,
    PeopleAltOutlined, Search
} from "@material-ui/icons";
import {Avatar, Button, Input} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";
import firebase from 'firebase/compat/app'

import db, {auth} from "./firebase";
import Modal from 'react-modal'


function Navbar() {

    const user=useSelector(selectUser)  //user의  state를 가져옴
    const [openModal, setOpenModal]=useState(false) //ask버튼을 눌러야 실행 Modal창이 닫혀있는(false)[초기]상태
    const [input, setInput]=useState("")    //초기상태 빈칸
    const [inputUrl, setInputUrl]=useState("")  //초기상태 빈칸
    const handleQuestion=(e)=>{
        e.preventDefault();
        setOpenModal(false)
        db.collection("questions").add({
            question: input,
            imageUrl: inputUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user,
        })
        setInput("")
        setInputUrl("")
    }
    return (
        <div className="navbar">
            <div className="qHeader_logo">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/2880px-Quora_logo_2015.svg.png"
                    alt=""/>
            </div>
            <div className="qHeader_icons">
                <div className="qHeader_icon">
                    <Home/>
                </div>
                <div className="qHeader_icon">
                    <BorderAllRounded/>
                </div>
                <div className="qHeader_icon">
                    <AssignmentIndOutlined/>
                </div>
                <div className="qHeader_icon">
                    <PeopleAltOutlined/>
                </div>
                <div className="qHeader_icon">
                    <NotificationsOutlined/>
                </div>
            </div>
            <div className="qHeader_input">
                <input type="text" placeholder="search"/>
                <Search/>
            </div>
            <div className="qHeader_Rem">
                <div className="qHeader_avatar">
                    <Avatar src={user.photo} onClick={()=>auth.signOut()}/>
                    {/*//google user 의  photo*/}
                </div>
                <Language/>
                <Button onClick={()=>setOpenModal(true)}>Ask</Button> {/*모달창을 true로 만듦*/}
                <Modal isOpen={openModal} onRequestClose={()=>setOpenModal(false)} shouldCloseOnOverlayClick={false}
                       style={{
                           // 모달창 꾸미기
                           overlay:{
                               width:700,
                               height:600,
                               backgroundColor:"rgb(0,0,0,0.8)",
                               zIndex:"1000",
                               top:"50%",
                               left:"50%",
                               marginTop:"-300px",
                               marginLeft:"-350px",
                               


                           }
                       }}>
                    {/*openModal이 true가 됐으므로 Modal창이 열림*/}
                    {/*onRequestClose : Modal창 밖을 누르거나 false가 되면 닫히게 만드는 함수*/}
                    <div className="modal_title">
                        <h5>Question</h5>
                        <h5>Share</h5>
                    </div>
                    <div className="modal_info">
                        <Avatar src={user.photo}/>
                        <p>Questioner : {user.displayName?user.displayName:user.email}</p>
                        <div className="modal_scope">
                            <PeopleAltOutlined/>
                            <p>Public</p>
                            <ExpandMore/>
                        </div>
                    </div>
                    <div className="modal_Field">
                        <Input type="text" placeholder="Write in 5W1H" required value={input} onChange={(e)=>setInput(e.target.value)}/>
                        {/*required : value 가 없으면 활성화 안됨
                        onChange로 input에 value가 들어올때마다 setInput에 넣음
                        */}
                        <div className="modal_fieldLink">
                            <Link/>
                            <Input type="text" placeholder="Write in Link" value={inputUrl} onChange={(e)=>setInputUrl(e.target.value)}/>

                        </div>
                    </div>
                    <div className="modal_buttons">
                        <button type="text" className="add" onClick={handleQuestion}>Ask</button>
                        <button onClick={()=>setOpenModal(false)} className="can">Close</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Navbar;