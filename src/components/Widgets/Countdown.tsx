import React, { useState, useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";

export const CountdownDimensions = {
  x: 0,
  y: 0,
  w: 3,
  h: 5,
  maxW: 4,
  maxH: 5,
  minW: 3,
  minH: 5,
};

interface CountdownProps {
  title: string;
  date: Date;
  id: string;
}

const Countdown: React.FC<CountdownProps> = ({ title, date, id }) => {
  const { settings } = useSettings();
  const theme = settings.theme;
  const themeClass =
    theme === "dark"
      ? "dark"
      : theme === "light"
      ? "light"
      : "bg-accent text-solid-text";

  // Function to calculate days left
  const calculateDaysLeft = (targetDate: Date) => {
    const currentDate = new Date();
    targetDate = new Date(targetDate);
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    return Math.round(Math.abs(timeDiff / (1000 * 3600 * 24)));
  };

  const [daysLeft, setDaysLeft] = useState(1);

  // Update days left when the component mounts or when the date prop changes
  useEffect(() => {
    setDaysLeft(calculateDaysLeft(date));
  }, [date]);

  return (
    <div
      className={`group p-2 grid place-items-center widget rounded-md w-full h-full ${themeClass}`}
    >
      <div className="m-auto w-full ">
        <span className="text-center">{title}</span>
      </div>
      <div className="m-auto w-full text-lg items-center flex gap-1">
        <span className="text-2xl font-semibold">{daysLeft}</span>
        <span className="e">{daysLeft === 1 ? "day" : "days"} left</span>
      </div>
    </div>
  );
};

export default Countdown;
