import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import s from "./GameHistory.module.css";

export default function GameHistory({ totalScore, gameStarted }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (totalScore && !gameStarted) {
      setHistory((prevState) => [{ id: nanoid(), totalScore }, ...prevState]);
    }
  }, [totalScore, gameStarted]);

  return (
    <div className={s.container}>
      <p className={s.historyTitle}>Game History</p>
      <ul className={s.list}>
        {history.slice(0, 10).map((el, i) => (
          <li key={el.id} className={s.item}>
            {i + 1} результат: {el.totalScore} очков
          </li>
        ))}
      </ul>
    </div>
  );
}
