import { useState, useRef } from 'react';
import { nanoid } from 'nanoid';

import FoodGenerator from '../FoodGenerator';
import Snake from '../Snake';

import s from './GameMap.module.css';

export default function GameMap({
  totalScore,
  setTotalScore,
  gameStarted,
  setGameStarted,
}) {
  const [snake, setSnake] = useState([{ id: nanoid(), top: 0, left: 0 }]);

  const containerRef = useRef();
  const activeInterval = useRef();

  return (
    <div className={s.gameContainer} ref={containerRef}>
      <Snake
        snake={snake}
        setSnake={setSnake}
        setTotalScore={setTotalScore}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
        containerRef={containerRef}
        activeInterval={activeInterval}
      />
      {activeInterval.current ? (
        <FoodGenerator
          position={snake[0]}
          container={containerRef}
          setSnake={setSnake}
        />
      ) : null}
      <button
        type="button"
        className={gameStarted ? `${s.buttonHidden}` : `${s.button}`}
        onClick={() => setGameStarted(true)}
      >
        {!totalScore ? 'go!' : 'try again'}
      </button>
    </div>
  );
}
