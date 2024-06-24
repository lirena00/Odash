// components/SnakeGame.tsx
import React, { useState, useEffect, useRef } from "react";

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        if (
          head.x < 0 ||
          head.x >= 20 ||
          head.y < 0 ||
          head.y >= 20 ||
          newSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y
          )
        ) {
          setGameOver(true);
          return prev;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "red";
        context.fillRect(food.x * 20, food.y * 20, 20, 20);

        context.fillStyle = "green";
        snake.forEach((segment) =>
          context.fillRect(segment.x * 20, segment.y * 20, 20, 20)
        );
      }
    }
  }, [snake, food]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        style={{ border: "1px solid black" }}
      />
      {gameOver && <div>Game Over</div>}
    </div>
  );
};

export default Game;
