"use client";
import React from "react";

//INTERNAL IMPORT
import Style from "./Button.module.css";

const Button = ({ btnText, handleClick, classStyle }) => {
  return (
    <div className={Style.box}>
      <button 
        className={`${Style.button} ${classStyle}`} 
        onClick={handleClick ? handleClick : () => {}}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Button;