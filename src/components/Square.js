import React from 'react';
import ReactDOM from 'react-dom';



/* 'props' here are the properties that are on the <Square /> component when it's rendered. */
export function Square(props) {
	console.log('props')
	console.log(props)
  return (
    <button key={props.key} className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}