import React from 'react';
import ReactDOM from 'react-dom';
import { Square } from './Square.js';

export class Board extends React.Component {

  /*  i = the index of the square when it was rendered. */
  renderSquare(i) {
    // console.log(this.props.squares)
    // console.log(i)

    return (
      /* props.squares comes from index.js -- the parent class -- but 'i' comes from Board.js... this class. We're combining values from each class */
      <Square 
        value={this.props.squares[i]} 
        squareindex={i}
        onSquareClick={() => this.props.onSquareClick(i)} />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}