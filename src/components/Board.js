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
        myKey={i}
        onClick={() => this.props.onSquareClick(i)} />
    );
  }

  renderBoard(numRows, numCols){
    let rows = [];
    let k = 0;

    for (let i = 0; i < numRows; i++){
      let col = [];
      for (let j = 0; j < numCols; j++){
        col.push(this.renderSquare(k))
        k++;
      }
      rows.push(<div key={i} className="board-row">{col}</div>);
    }

    return (
      rows
    )
  }

  render() {
    return (
      <div>
        {this.renderBoard(3,3)}
      </div>
    );
  }
}