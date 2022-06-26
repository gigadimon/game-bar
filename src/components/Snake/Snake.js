import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import SnakeEl from "./SnakeEl";

const SNAKE_SPEED = 50;

export default function Snake({
  snake,
  setSnake,
  setTotalScore,
  gameStarted,
  setGameStarted,
  containerRef,
  activeInterval,
}) {
  const [direction, setDirection] = useState("");

  useEffect(() => {
    const leftOrTopOutOfLine = (prevState, type) => {
      let clientParam;
      type === "left"
        ? (clientParam = "clientWidth")
        : (clientParam = "clientHeight");
      if (prevState[type] > 0) {
        return {
          id: nanoid(),
          ...prevState,
          [type]: prevState[type] - 20,
        };
      }
      return {
        id: nanoid(),
        ...prevState,
        [type]: containerRef.current[clientParam] - 20,
      };
    };
    const rightOrBottomOutOfLine = (prevState, type) => {
      if (
        prevState[type] + 20 <
        (type === "top"
          ? containerRef.current.clientHeight
          : containerRef.current.clientWidth)
      ) {
        return {
          id: nanoid(),
          ...prevState,
          [type]: prevState[type] + 20,
        };
      }
      return {
        id: nanoid(),
        ...prevState,
        [type]: 0,
      };
    };

    const handleSnakeMove = (arr, firstValue) => {
      return arr.map((el, i, arr) => {
        return i === 0
          ? { id: el.id, top: firstValue.top, left: firstValue.left }
          : { id: el.id, top: arr[i - 1].top, left: arr[i - 1].left };
      });
    };

    const pressButtonMechanics = ({ direction, reverseDirection, outline }) => {
      activeInterval.current && clearInterval(activeInterval.current);
      snake.length === 1 && setTotalScore(0);
      activeInterval.current = setInterval(() => {
        setDirection(direction);
        setSnake((prevState) => {
          if (reverseDirection === "down" || reverseDirection === "right") {
            return [
              leftOrTopOutOfLine(prevState[0], outline),
              ...handleSnakeMove(prevState.slice(1), prevState[0]),
            ];
          }
          if (reverseDirection === "up" || reverseDirection === "left") {
            return [
              rightOrBottomOutOfLine(prevState[0], outline),
              ...handleSnakeMove(prevState.slice(1), prevState[0]),
            ];
          }
        });
      }, SNAKE_SPEED);
    };

    const handlePressButton = (event) => {
      if (event.code === "ArrowUp" || event.code === "KeyW") {
        if (direction !== "down") {
          pressButtonMechanics({
            direction: "up",
            reverseDirection: "down",
            outline: "top",
          });
        }
      }

      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        if (direction !== "right") {
          pressButtonMechanics({
            direction: "left",
            reverseDirection: "right",
            outline: "left",
          });
        }
      }

      if (event.code === "ArrowDown" || event.code === "KeyS") {
        if (direction !== "up") {
          pressButtonMechanics({
            direction: "down",
            reverseDirection: "up",
            outline: "top",
          });
        }
      }

      if (event.code === "ArrowRight" || event.code === "KeyD") {
        if (direction !== "left") {
          pressButtonMechanics({
            direction: "right",
            reverseDirection: "left",
            outline: "left",
          });
        }
      }
    };

    if (gameStarted) {
      document.addEventListener("keydown", handlePressButton);
    }

    return () => {
      document.removeEventListener("keydown", handlePressButton);
    };
  });

  useEffect(() => {
    return () => {
      const snakeCrossed =
        snake.filter(
          (el) =>
            snake[0].top === el.top && snake[0].left === el.left && !el.new
        ).length > 1;

      if (snakeCrossed) {
        clearInterval(activeInterval.current);
        activeInterval.current = 0;
        setTimeout(() => {
          setSnake([{ id: nanoid(), top: 0, left: 0 }]);
          setDirection("");
        }, 1500);
        setGameStarted(false);
      }

      if (snake.slice(1).length) {
        setTotalScore(snake.slice(1).length);
      }
    };
  }, [snake, setSnake, activeInterval, setGameStarted, setTotalScore]);

  return (
    <>
      {snake.map((el) => {
        return (
          <SnakeEl
            key={el.id}
            styles={{ top: el.top + "px", left: el.left + "px" }}
          />
        );
      })}
    </>
  );
}
