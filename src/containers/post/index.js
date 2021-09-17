import { useContext } from "react";
import { Comment, CommentInput } from "../../components";
import { UserContext } from '../../contexts/auth-user';
import { db, storage } from "../../firebase";
import './style.css'

export default function Post(props) {

    const [user, setUser] = useContext(UserContext).user;

    const deletePost = () => {
        //delete the image from firebase storage
        //get ref to the image file we like to delete
        var imageRef = storage.refFromURL(props.postImageUrl);
        //delete the file
        imageRef.delete().then(() => {
            console.log("delete successfull");
        }).catch((err) => {
            console.log(`Error ${err}`);
        });

        //delete post info from firebase firestore
        db.collection("posts").doc(props.id).delete().then(() => {
            console.log("delete post info successfull");
        }).catch((err) => {
            console.log(`Error post info ${err}`);
        });
    }

    return (
        <div className="post">
            <div className="post__header">
                <div className="post__logedInUsr">
                    <img className="post__img" src={props.userProfileUrl} />
                    <p style={{ marginLeft: "8px" }}>{props.userName}</p>
                </div>
                <button className="post__deletebtn" onClick={deletePost}
                >Delete</button>
            </div>
            <div >
                <img className="post__image" src={props.postImageUrl} alt="post" />
            </div>
            <div>
                <p><span style={{ fontWeight: "500", marginRight: "4px" }}>{props.userName}</span> {props.caption}</p>
            </div>

            {props.comments ? props.comments.map((comment) => (
                <Comment comments={comment.comment} userName={comment.username} />
            )) : ""}

            {user ? <CommentInput comments={props.comments} id={props.id} /> : <></>}

        </div>
    )

}