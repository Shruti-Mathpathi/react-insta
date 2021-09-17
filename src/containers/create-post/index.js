import { useContext, useState } from 'react';
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/auth-user';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './style.css';
import { db, storage } from '../../firebase';
import makeid from '../../helper/functions';
import firebase from 'firebase';

export default function CreatePost() {

    const [user, setUser] = useContext(UserContext).user;

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const imageHandler = (e) => {
        console.log(e);
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            let imageUrl = URL.createObjectURL(e.target.files[0]);
            let imagePrev = document.getElementById('imagePrev');
            imagePrev.src = imageUrl;
            imagePrev.style.display = "block";
        }
    }

    const uploadHandler = (e) => {
        if (image) {
            let imageName = makeid(10);
            const uploadTask = storage.ref(`images/${imageName}.jpg`)
                .put(image);

            uploadTask.on("state_changed", (snapshot) => {
                //progress function 1%,2%;
                const progress = Math.round((snapshot.bytesTransferred /
                    snapshot.totalBytes) * 100);
                setProgress(progress);
            }, (error) => {
                console.error(error);
            }, () => {
                //get download url and upload the post info
                storage.ref("images").child(`${imageName}.jpg`).
                    getDownloadURL()
                    .then((imageUrl) => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            photoUrl: imageUrl,
                            username: user.email.replace("@gmail.com", ""),
                            profileUrl: user.photoURL
                        })
                    })
                setCaption("");
                setProgress(0);
                document.getElementById('imagePrev').style.display = "none";
            });
        }
    }

    const captionHandler = (e) => {
        if (e.target.value) {
            setCaption(e.target.value);
            console.log(e.target.value);
        }
    }

    return (
        <div className="create-post">
            {user ? (
                <div className="createPost_lognIn">
                    <p>Create Post</p>
                    <div className="createPost_textarea">
                        <textarea rows="3" value={caption} placeholder="enter caption here.."
                            onChange={captionHandler}></textarea>

                        <div className="createPost_imgPrev">
                            <img id="imagePrev" alt="" />
                        </div>
                    </div>
                    <div className="createPost_bottom">
                        <div className="createPost_image">
                            <label className="createPost_icon" htmlFor="imageid">
                                <AddAPhotoIcon />
                            </label>
                            <input id="imageid" onChange={imageHandler} type="file" accept="image/*" />
                        </div>
                        <button className="createPost_upldBtn" style={{ color: caption ? "#000" : "lightgrey" }}
                            onClick={uploadHandler}>{`Upload ${progress != 0 ? progress : ""}`}</button>
                    </div>
                </div>
            ) :
                (
                    <div>  <SignInBtn />
                        <p style={{ marginLeft: '12px' }}>to Post & Comment</p></div>
                )
            }
        </div>
    )

}