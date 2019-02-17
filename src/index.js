/* NOTES
- Props are always passed DOWN from parent elements to their children. 
- However, functions pass arguments UP from child elements to their parents, where that funciton is called.


NEXT STEPS
Head to this site: https://reactjs.org/tutorial/tutorial.html

Current Stage: Picking a key
- Extra #3: 

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
    };
  }


  /* Run this when a square is clicked. 'i' = the index of the square that was clicked. */
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

    /* Inside the 'Squares' array, set the value of the clicked square to either 'X' or 'O' */
    squares[i] = this.state.xIsNext ? 'X':'O';

    this.setState({
      /* Add a new object to the history array. That object contains the new squares array -- which holds a new value for the square that was just clicked. It also contains the index of the square that was clicked. */
      history: history.concat({
        squares: squares,
        selectedSquare: i
      }),

      /* Update the step we're on. */
      stepNumber: history.length,

      /* Switch who the next player is */
      xIsNext: !this.state.xIsNext
    })
  }

  /* Update stepNumber & change player whose turn is next. Because state is updated, the entier app is rerendered... I think. */
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  /* Return the board coordinates of the clicked square */
  findSquareCoordinates(square) {
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

  getGameStatus(winner){
    if (winner) {
      return 'Winner: ' + winner;
    } else {
      return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
  }

  /* Render is called on init, and each time the state is changed.  */
  render() {
    /* Grab history */
    const history = this.state.history;

    /* Grab stepNumber */
    const latestStep = this.state.stepNumber

    /* Grab contents of most recent move */
    const current = history[latestStep];

    /* Calculate if there's been a winner */
    const winner = calculateWinner(current.squares);

    const gameStatus = this.getGameStatus(winner);

    /* FULL: Render the move list. It's a numbered list of buttons that, when clicked, revert the board to that number move in history */
    const moves = history.map((step, index) => {

      /* find the square coordinates of the latest move. Use the latest selectedSquare as a param. */
      let squareCoordinates = this.findSquareCoordinates(step.selectedSquare);

      /* Create a description of the move. */
      const desc = index ? 
        'Go to move #' + index + " -- " + squareCoordinates : 
        'Go to game start';

      /* Bold the latest move in the move log. (i.e. If our game's stepNumber is equal to the index of the button we're creating, make that new button bold. This works because, each time a new button is made, we update our state, and everytime we update our state, our ENTIRE app is re-rendered. */
      const moveListStyle = (latestStep === index) ? "bold" : "";

      /* Into 'moves', push a list item contaning a button with an onClick function. Clicking on the button will call the jumpTo function with the current move passed as a parameter)  */
      return (
        <li key={index}>
          <button className={moveListStyle} onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">

          {/* 'i' here is the value passed up from <Square />. 
          current.squares equals the current game board. Each time the class's state is changed, the board has the option to re-render. When the 'history' array is updated, the board component will render a new board in the dom. */}
          <Board squares={current.squares} onSquareClick={(i) => this.handleSquareClick(i)} />
        </div>
        <div className="game-info">

          {/* Show if there's a winner, or who's up next. */}
          <div>{gameStatus}</div>

          {/* Log the player's most recent action on the DOM. */}
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

/* Did a player win? */
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
