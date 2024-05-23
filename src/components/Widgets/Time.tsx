import { useEffect, useState } from "react";

interface TimeProps {
  theme: string;
}

export const TimeDimensions = {
  x: 0,
  y: 0,
  w: 7,
  h: 2,
  minW: 4,
  minH: 2,
  maxW: 7,
  maxH: 3,
};

const Time: React.FC<TimeProps> = ({ theme }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeString = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Set to false for 24-hour clock format
      });

      const dateString = currentDate.toLocaleDateString([], {
        weekday: "short",
        day: "2-digit",
        month: "short",
      });

      setTime(timeString);
      setDate(dateString);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const themeClass =
    theme === "dark"
      ? "dark"
      : theme === "light"
      ? "light"
      : "bg-accent text-solid-text";

  return (
    <div
      className={`p-2 grid place-items-center widget rounded-md w-full h-full ${themeClass}`}
    >
      <div className="text-4xl font-bold">{time}</div>
      <div>{date}</div>
    </div>
  );
};

export default Time;
