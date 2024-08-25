import "./App.css";
import Keyboard from "./components/Keyboard";
import Board from "./components/Board";
import { boardDefault, generateWordSet } from "./Words";

import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";
import StartPage from "./components/StartPage";
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);

  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });

  const [wordSet, setWordSet] = useState(new Set());

  const [wordArr,setWordArr] = useState([]);

  const [disabledLetters, setDisabledLetters] = useState([]);

  const [startGame,setStartGame] = useState(true);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const [correctWord, setCorrectWord] = useState("");


  // word bank generate
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      setCorrectWord((prev) => prev.toUpperCase());
      setWordArr(words.reswordArr);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onEnter = () => {
    // console.log(correctWord);
    if (currAttempt.letterPos !== 5) return;

    // check if the word is inside the set
    let currWord = "";

    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLocaleLowerCase())) {
      setCurrAttempt({
        ...currAttempt,
        attempt: currAttempt.attempt + 1,
        letterPos: 0,
      });
    } else alert("No word found");

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    } else if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  return (
    <div className="App">
      <nav>
        <h1>WORDLE</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
          startGame,setStartGame
        }}
      >
        <div className="game">
          {startGame &&<StartPage />}
          {!startGame && <Board />}
          {!startGame  && (gameOver.gameOver ? <GameOver /> : <Keyboard />)}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
