import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <section className={classes["input-container"]}>
      {!!props.value && (
        <h1>
          Search value: <span>{props.value}</span>
        </h1>
      )}
      <input
        type="search"
        value={props.value}
        className={classes.input}
        onChange={props.onChangeHandler}
        placeholder="Type you're search"
      />
    </section>
  );
};

export default Input;
