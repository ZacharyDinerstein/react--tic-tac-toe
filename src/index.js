/* NOTES
- Props are always passed DOWN from parent elements to their children. 
- However, functions pass arguments UP from child elements to their parents, where that funciton is called.


NEXT STEPS
Head to this site: https://reactjs.org/tutorial/tutorial.html

Current Stage: Picking a key
- Comment entire app
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

      /* An array filled with objects. Those objects contain the values associated with each turn. Specifically, all of the board values (stored in an array), and the square clicked in that turn. */
      history: [
        {
          /* squares = An array of all the current values of our board. */
          squares: Array(9).fill(null),

          /* The array num of the most recent selected square. */
          selectedSquare: null
        }
      ],
      /* The number of the current step in the game. */
      stepNumber: 0,

      /* Which players turn is up next */
      xIsNext: true,

      /* Which square was selected most recently */
      numOfSquareSelected: 0
    };
  }


  /* Run this when a square is clicked. i =  */
  handleSquareClick(i) {

    /* Create a new version of 'history'. Make it only as long as the step num we're on. */
    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    /* Grab the current board move */
    const current = history[history.length - 1];

    /* Make a new version of the array containing our current board move */
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

    function hi(word){
      alert(word);
    }
    hi('hi');

  }

  render() {
    const history = this.state.history;
    const latestStep = this.state.stepNumber
    const current = history[latestStep];    
    const winner = calculateWinner(current.squares);


    //Register a numbered list of buttons that contain, when clicked, revert the board to that number move in history
    const moves = history.map((step, move) => {
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
          <button className="" onClick={() => this.jumpTo(move)}>{desc}</button>
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

          {/* 'i' here is the value passed up from <Square /> */}
          <Board squares={current.squares} onSquareClick={(i) => this.handleSquareClick(i)} />
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
