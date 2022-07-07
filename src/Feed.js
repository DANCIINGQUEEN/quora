import React, {useEffect, useState} from 'react';
import './Feed.css'
import QuoraBox from "./QuoraBox";
import Post from "./Post";
import db from "./firebase";
function Feed() {
    const [posts, setPosts]=useState([])   //post정보 가져오기
    useEffect(()=>{
        db.collection("questions").orderBy('timestamp', 'desc').
            onSnapshot(snapshot=>setPosts(snapshot.docs.map((
                doc)=>({
            // datebase에서 자료를 가져옴
            id:doc.id,
            question:doc.data()

            })
        )))
        //orderby : 규칙정해주기 timestamp : 서버의 시간, desc : 내림차순(최신것이 위로)
    }, [])
    return (
        <div className="feed">
            <QuoraBox/>
            {/*<Post/>*/}
            {posts.map(({id, question})=>(
                <Post
                    key={id}
                    Id={id}
                    image={question.imageUrl}
                    question={question.question}
                    timestamp={question.timestamp}
                    quoraUser={question.user}/>
                // post mapping Post.js로 정보를 보냄
            ))}
        </div>
    );
}

export default Feed;