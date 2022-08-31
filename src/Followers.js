import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Followers.css";
import { getValue } from "@testing-library/user-event/dist/utils";

function Followers(props) {

    const [newFollowProp, prevFollow] = useState([]);

    const getFollowProposal = () => {

        axios
            .post("https://akademia108.pl/api/social-app/follows/recommendations")
            .then((res) => {
                prevFollow(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getFollowProposal()
    }, [props.posts])

    const newFollow = (id) => {

        axios
            .post("https://akademia108.pl/api/social-app/follows/follow", {
                leader_id: id
            })
            .then((res) => {
                props.followersPosts()
                console.log(res.data)
            })
            .catch((err => {
                console.log(err)
            }))
    }

    return (
        <div className="main-followers">
            {newFollowProp.map((followers) => {
                return (
                    <div className="follow-proposal-holder" key={followers.id}>
                        <div className="follow-prop">
                            <h3>{followers.username}</h3>
                            <div className="follower-avatar">
                                <img src={followers.avatar_url} alt={followers.username} />
                            </div>
                            <button onClick={() => newFollow(followers.id)}>Follow</button>
                        </div>
                    </div>
                );
            })
            }
        </div >
    )
}


export default Followers;