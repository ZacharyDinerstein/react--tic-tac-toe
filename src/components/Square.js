import React from 'react';
import ReactDOM from 'react-dom';

/* 'props' here are the properties that are on the <Square /> component when it's rendered. */
export function Square(props) {

  return (
    <button key={props.myKey} className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}