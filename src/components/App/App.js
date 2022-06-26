import { useState } from "react";
import s from "./App.module.css";
import GameMap from "../GameMap";
import GameHistory from "../GameHistory";

export default function App() {
  const [totalScore, setTotalScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className={s.mainContainer}>
      <GameHistory totalScore={totalScore} gameStarted={gameStarted} />
      <div className={s.container}>
        <p className={s.score}>Score: {totalScore}</p>

        <GameMap
          totalScore={totalScore}
          setTotalScore={setTotalScore}
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
        />

        <p>{"УПРАВЛЕНИЕ СТРЕЛКАМИ ИЛИ WASD"}</p>
      </div>
    </div>
  );
}
