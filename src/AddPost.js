import React, { useState } from "react";
import axios from "axios";
import "./AddPost.css";


function AddPost(props) {

    const [postData, setPostData] = useState("")

    const addNewPost = (e) => {

        let newUserPost = {
            "content": postData
        }

        e.preventDefault()
        axios
            .post("https://akademia108.pl/api/social-app/post/add", newUserPost)
            .then((res) => {
                console.log(res.data)
                props.newPost()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    return (
        <div className="post-creator">
            <form className="add-post-content">
                <textarea onChange={(e) => setPostData(e.target.value)} name="postcontent" placeholder="Add post..."></textarea>
                <button onClick={addNewPost} className="add-post-btn">Add</button>
            </form>
        </div>

    );
}

export default AddPost;