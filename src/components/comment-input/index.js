import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/auth-user';
import { db } from '../../firebase';
import './style.css';

export default function CommentInput({comments,id}) {
    const [comment,setComment] = useState("");
    const [user,setUser] = useContext(UserContext).user;
    const [commentArray,setCommentArray] = useState(comments ? comments : [])

    const addComment = () =>{
        //add comment to the post info
        console.log(comments)
        if(comment != ""){
            commentArray.push({
                comment:comment,
                username:user.email.replace("@gmail.com","").toLowerCase()
            })
        }
        db.collection("posts").doc(id).update({
            comments:commentArray
        }).then(()=>{
            setComment("");
            console.log("comment added");
        }).catch((err)=>{
            console.log(`Error in adding comment ${err}`)
        })

    }

    return (
        <div className="commentInput">
            <textarea
            className="commentInput__textarea"
            rows="1" placeholder="write a comment.."
            value={comment}
            onChange={(e)=>{setComment(e.target.value)}}
            ></textarea>
            <button className="commentInput__btn"
            onClick={addComment}>Post</button>
        </div>
    )
};
