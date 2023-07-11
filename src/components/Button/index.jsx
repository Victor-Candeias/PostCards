import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <section className={classes["button-container"]}>
      <button
        disabled={props.disabled}
        onClick={props.onClickHandler}
        className={classes.button}
      >
        {props.text}
      </button>
    </section>
  );
};

export default Button;
