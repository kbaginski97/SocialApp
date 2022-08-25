import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Followers.css";

function Followers(props) {

    const [newFollowProp, prevFollow] = useState([]);

    const getFollowProposal = () => {

        axios
            .post("https://akademia108.pl/api/social-app/follows/recommendations")
            .then((res) => {
                prevFollow(res.data)
                console.log(res.data)
            })
    }

    useEffect(() => {
        getFollowProposal()
    }, [])

    const newFollow = (id) => {

        let getNewFollower = {
            "leader_id": id
        }

        axios
            .post("https://akademia108.pl/api/social-app/follows/follow", getNewFollower
            )
            .then((res => {
                console.log(res.data)
                props.followersPosts()
            }))
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
                                <img src={followers.avatar_url} />
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