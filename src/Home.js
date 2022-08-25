import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import AddPost from "./AddPost";
import Followers from "./Followers";
import Post from "./Post";

function Home(props) {

  const [posts, setPosts] = useState([]);

  const getNextPosts = () => {

    let latestPostData = {
      date: posts[posts.length - 1].created_at
    }

    axios.post("https://akademia108.pl/api/social-app/post/older-then", latestPostData)
      .then((res) => {
        setPosts(posts.concat(res.data));
      })
  }

  const getPosts = () => {
    axios.post("https://akademia108.pl/api/social-app/post/latest")
      .then((res) => {
        setPosts(res.data);
      });
  };

  useEffect(() => {
    getPosts()
  }, [])

  console.log(posts);

  const getNewerPost = () => {

    let lastUpdate = {
      date: posts[0].created_at
    }

    axios
      .post("https://akademia108.pl/api/social-app/post/newer-then", lastUpdate)
      .then((res) => {
        setPosts(res.data.concat(posts));
      })
  };

  const deletePost = (id) => {
    let currentPostId = {
      "post_id": id
    }
    axios
      .post("https://akademia108.pl/api/social-app/post/delete", currentPostId)
      .then((res) => {
        setPosts(prevPosts => {
          return prevPosts.filter(post => post.id !== id)
        })
      })
  }

  return (
    <div className="main-div">
      {props.user &&
        <div className="post-creator">
          <AddPost newPost={getNewerPost} />
        </div>
      }
      {props.user &&
        <div className="followers">
          <Followers followersPosts={getPosts} user={props.user} />
        </div>
      }

      {posts.map((post) => {

        return (
          <Post post={post} user={props.user} key={post.id} deletingPost={deletePost} getPost={getPosts} />
        )
      })}
      <button onClick={getNextPosts} className="load-morebtn">Load More</button>
    </div>
  );
}

export default Home;
