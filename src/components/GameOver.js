import React, { useContext } from "react";
import { AppContext } from "../App";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

function GameOver() {
  const { gameOver, correctWord, currAttempt } = useContext(AppContext);
  const { width, height } = useWindowSize();
  return (
    <div className="gameOver">
      <h2>
        {gameOver.guessedWord ? "You guessed the word correctly" : "You failed"}
      </h2>
      <h1>Correct Word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed it in {currAttempt.attempt} attempts</h3>
      )}
      {gameOver.guessedWord && <Confetti width={width} height={height} />}
    </div>
  );
}

export default GameOver;
