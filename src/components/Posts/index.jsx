import React from "react";
import classes from "./Posts.module.css";
import PostCard from "../PostCard/index";

const Posts = (props) => {
  return (
    <div className={classes.posts}>
      {props.posts.map((post) => (
        <PostCard key={post.id} post={post} id={post.id} />
      ))}
    </div>
  );
};

export default Posts;
