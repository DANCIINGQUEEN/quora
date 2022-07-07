import React, {useEffect, useState} from 'react';
import './Post.css'
import {Avatar, Input} from "@material-ui/core";
import {
    ArrowDownward,
    ArrowUpward,
    ChatBubbleOutline, ExpandMore, Link,
    MoreHorizOutlined, PeopleAltOutlined,
    RepeatOneOutlined,
    ShareOutlined
} from "@material-ui/icons";
import Modal from 'react-modal'
import {useDispatch, useSelector} from "react-redux";
import {selectQuestionId, selectQuestionName, setQuestionInfo} from "./features/questionSlice";
import {selectUser} from "./features/userSlice";
import db from "./firebase";
import firebase from "firebase/compat/app";
Modal.setAppElement("#root")
function Post({key, Id, image, question, timestamp, quoraUser})  {  //props설정
    const [openModal, setOpenModal]=useState(false)
    const [answer, setAnswer]=useState("")
    const dispatch=useDispatch()
    const user=useSelector(selectUser)
    const questionId=useSelector(selectQuestionId)
    const questionName=useSelector(selectQuestionName)
    const [getAnswer, setGetAnswer]=useState([])


    const handleAnswer=(e)=>{
        e.preventDefault()
        if(questionId){
            db.collection('questions').doc(questionId).collection('answer')
                .add({
                    questionId:questionId,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    answer:answer,
                    user:user
                })
            console.log(questionId, questionName)
            setAnswer("")
            setOpenModal(false)
        }
    }
    useEffect(()=>{
        if(questionId){
            db.collection('questions').doc(questionId).collection('answer').orderBy('timestamp', 'desc').onSnapshot((snapshot=>setGetAnswer(
                snapshot.docs.map((doc)=>(
                    {id:doc.id, answers:doc.data()}))
            )))
        }
    }, [questionId])
    return (
        <div className="post" onClick={()=>dispatch(setQuestionInfo({
            questionId:Id,
            questionName:question,
        }))}>
            <div className="post_info">
                <Avatar src={quoraUser.photo}/>
                <h5>{quoraUser.displayName?quoraUser.displayName:quoraUser.email}</h5>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
            <div className="post_body">
                <div className="post_question">
                    <p>{question}</p>
                    <button className="post_btnAnswer" onClick={()=>setOpenModal(true)}>Answer</button>
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
                        <div className="modal_question">
                            <h1>{question}</h1>
                            <p>
                                <span className="name">
                                    {quoraUser.displayName?quoraUser.displayName:quoraUser.email}
                                </span>
                                's question{" "}
                                <span className="time">
                                    {new Date(timestamp?.toDate()).toLocaleString()}
                                </span>
                            </p>
                        </div>
                        <div className="modal_answer">
                            <textarea placeholder="Write your answer" type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                        </div>

                        <div className="modal_buttons">
                            <button type="submit" className="add" onClick={handleAnswer}>Answer</button>
                            <button onClick={()=>setOpenModal(false)} className="can">Close</button>
                        </div>
                    </Modal>
                </div>
                <div className="post_answer">
                    {
                        getAnswer.map(({id, answers})=>(
                            <p key={id} style={{position:"relative", paddingBottom:"5px"}}>
                                {Id===answers.questionId?(
                                    <span>{answers.answer}
                                        <br/>
                                        <span style={{
                                            position:"absolute",
                                            color:"yellowgreen",
                                            fontSize:"small",
                                            display:"flex",
                                            right:"0px"
                                        }}><span style={{color:"#b92b27"}}>
                                                {answers.user.displayName?answers.user.displayName:answers.user.email}
                                            </span>
                                            {" "}{new Date(answers.timestamp.toDate()).toLocaleString()}
                                        </span>
                                    </span>
                                ):(" ")}
                            </p>
                            )
                        )
                    }
                </div>
                <img src={image} alt=""/>
            </div>
            <div className="post_footer">
                <div className="post_footerAction">
                    <ArrowUpward/>
                    <ArrowDownward/>
                </div>
                    <RepeatOneOutlined/>
                    <ChatBubbleOutline/>
                    <div className="post_footerRight">
                        <ShareOutlined/>
                        <MoreHorizOutlined/>
                    </div>
            </div>
        </div>
    );
}

export default Post;