import React from "react";
import classes from "./PostCard.module.css";

const PostCard = (props) => {
  return (
    <div key={props.id} className={classes.post}>
      <img src={props.post.cover} alt={props.post.title} />
      <div key={props.id} className={classes["post-content"]}>
        <h2>
          {props.id} -{props.post.title}
        </h2>
        <p>{props.post.body}</p>
      </div>
    </div>
  );
};

export default PostCard;
