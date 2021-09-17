import { useContext } from 'react';
import { UserContext } from '../../contexts/auth-user';
import { signInWithGoogle } from '../../services/auth';
import './style.css';

export default function SignInBtn() {
    const [user, setUser] = useContext(UserContext).user;

    const signInHandler = async() =>{
        let userBySignIn = await signInWithGoogle();
        if(userBySignIn){
            setUser(userBySignIn);
        }
    }

    return (
        <div className="signInBtn" onClick={signInHandler}>
            <p>Sign In With Google</p>
        </div>
    )

}