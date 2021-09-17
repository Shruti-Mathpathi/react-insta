import './style.css'

export default function Comment({comments,userName}) {
    console.log(comments,userName);
    return (
        <div className="comment">
            <p>
                <span style={{ fontWeight: "500", marginRight: "4px" }}>
                    {userName}</span>
                {comments}
            </p>
        </div>
    )
};
