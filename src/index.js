/* NEXT STEPS
Head to this site: https://reactjs.org/tutorial/tutorial.html

Current Stage: Adding Time Travel

*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './components/Board.js';

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
