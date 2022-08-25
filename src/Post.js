import React, { useState } from "react";
import axios from "axios";
import "./Post.css";
import Followers from "./Followers";

function Post(props) {

    const [likeCount, setLikeCount] = useState(props.post.likes.length)

    const [likesValue, setLikesValue] = useState(
        props.post.likes.filter(likes => likes.username === props.user?.username)
            .length !== 0
    );

    const addLike = (id) => {

        let likeId = {
            post_id: id
        }

        axios
            .post("https://akademia108.pl/api/social-app/post/like", likeId)
            .then((res => {
                setLikeCount(likeCount + 1)
                setLikesValue(true)
            }))
    }

    const removeLike = (id) => {

        let likeId = {
            post_id: id
        }

        axios
            .post("https://akademia108.pl/api/social-app/post/dislike", likeId)
            .then((res => {
                setLikeCount(likeCount - 1)
                setLikesValue(false)
            }))
    }

    const disFollow = (id) => {

        let followerId = {
            "leader_id": id
        }

        axios
            .post("https://akademia108.pl/api/social-app/follows/disfollow", followerId)
            .then((res => {
                props.getPost()
                console.log(res.data)
            }))
            .catch((err => {
                console.log(err.data)
            }))
    }

    return (
        <div className="posts-holder">
            <div className="posts">
                <div className="avatar">
                    <img src={props.post.user.avatar_url} alt={props.post.user} />
                </div>
                <div className="post-data">
                    <div className="post-info">
                        <div className="user-name">
                            <strong>{props.post.user.username}</strong>
                        </div>
                        <div className="post-create-date">
                            <span> {props.post.created_at.substring(0, 10)}</span>
                        </div>
                    </div>
                    <div className="post-content">
                        {props.post.content}
                    </div>
                    <div className="likes">
                        {props.user?.username === props.post.user.username &&
                            <button onClick={() => props.deletingPost(props.post.id)} className="btnDel">Usuń</button>
                        }
                        {props.user && props.user.username !== props.post.user.username &&
                            (<button className="unfollowBtn" onClick={() => disFollow(props.post.user.id)}> Unfollow </button>)
                        }
                        {likesValue ?
                            <button className="like-button" onClick={() => { removeLike(props.post.id) }}> Dislike </button>
                            :
                            <button className="like-button" onClick={() => addLike(props.post.id)}> Like </button>
                        }
                        {likeCount}

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Post;