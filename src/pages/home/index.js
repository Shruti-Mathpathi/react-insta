import './style.css';
import { CreatePost, Feed, Navbar } from '../../containers';

export default function Home() {

    return (
        <div className="home">
            <Navbar />
            <CreatePost />
            <Feed />
        </div>
    );

}