import { useContext } from 'react';
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/auth-user';
import './style.css';

export default function Navbar() {
     const [user,setUser] = useContext(UserContext).user;
    return (
        <div className="navbar">
            <p>ReactInsta</p>
            {user ? <img className="navbar__img" src={user.photoURL} /> : <SignInBtn />}
        </div>
    )

}