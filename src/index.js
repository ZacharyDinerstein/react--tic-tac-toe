/* NEXT STEPS
Head to this site: https://reactjs.org/tutorial/tutorial.html

Current Stage: Picking a key

- Put clicked square val in state

*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './components/Board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          selectedSquare: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      numOfSquareSelected: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    //If there's a winner, or if the square clicked is already full, disable additional board clicks
    if (calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        selectedSquare: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      numOfSquareSelected: i
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const latestStep = this.state.stepNumber
    const current = history[latestStep];    
    const winner = calculateWinner(current.squares);


    //Register a numbered list of buttons that contain, when clicked, revert the board to that number move in history
    const moves = history.map((step, move) => {
      console.log('step')
      console.log(step)
      console.log('move')
      console.log(move)
      console.log('step.selectedSquare')
      console.log(step.selectedSquare)

      const findSquareCoordinates = (square) => {
        let row;
        let col;

        if (square === 0 || square === 1 || square === 2 ){
          row = 0;
        } else if (square === 3 || square === 4 || square === 5 ){
          row = 1;
        } else {
          row = 2;
        }
        
        if (square === 0 || square === 3 || square === 6 ){
          col = 0;
        } else if (square === 1 || square === 4 || square === 7 ){
          col = 1;
        } else {
          col = 2;
        }
        return row + ", " + col;
      }

      let squareCoordinates = findSquareCoordinates(step.selectedSquare);

      const desc = move ? 
        'Go to move #' + move + " -- " + squareCoordinates : 
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
