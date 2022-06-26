import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import s from "./FoodGenerator.module.css";

export default function FoodGenerator({ position, container, setSnake }) {
  const [food, setFood] = useState([]);

  let foodInterval = useRef();

  useEffect(() => {
    if (
      food.filter((el) => position.top === el.top && position.left === el.left)
        .length
    ) {
      setFood(() => {
        return [
          ...food.filter(
            (elem) => position.top !== elem.top || position.left !== elem.left
          ),
        ];
      });
      setSnake((prevState) => {
        return [
          ...prevState,
          {
            id: nanoid(),
            top: position.top,
            left: position.left,
            new: true,
          },
        ];
      });
    }
  }, [position, food, setSnake]);

  useEffect(() => {
    const randomNumber = (min, max, num) => {
      return (
        Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) *
        num
      );
    };

    if (food.length < 5) {
      foodInterval.current = setInterval(() => {
        setFood((prevState) => {
          return [
            ...prevState,
            {
              id: nanoid(),
              top: randomNumber(0, container.current.clientHeight - 20, 20),
              left: randomNumber(0, container.current.clientWidth - 20, 20),
            },
          ];
        });
      }, 1000);
    }

    return () => {
      clearInterval(foodInterval.current);
    };
  }, [foodInterval, food, container]);

  return (
    <>
      {food.map((el) => {
        return (
          <span
            key={el.id}
            style={
              ({ width: 50 }, { top: el.top + "px", left: el.left + "px" })
            }
            className={s.food}
          ></span>
        );
      })}
    </>
  );
}
