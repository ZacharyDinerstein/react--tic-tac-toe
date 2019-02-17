import React from 'react';
import ReactDOM from 'react-dom';

/* 'props' here are the properties that are on the <Square /> component when it's rendered. */
export function Square(props) {

  return (
    <button squareindex={props.squareIndex} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}