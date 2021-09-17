import { useEffect, useState } from "react";
import { Post } from "..";
import { db } from "../../firebase";
import './style.css'

export default function Feed() {
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        db.collection("posts").onSnapshot((snapshot)=>{
            setPosts(snapshot.docs.map((doc)=>({id:doc.id,post:doc.data()})));
        })
    },[]);
   
  
    return (
        <div className="feed">
            {posts.map((post)=>
              <Post 
              key={post.id}
              id={post.id}
              userProfileUrl={post.post.profileUrl}
              userName={post.post.username}
              postImageUrl={post.post.photoUrl}
              caption={post.post.caption}
              comments={post.post.comments}
              />)}
        </div>
    )
}
