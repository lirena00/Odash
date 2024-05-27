import { useEffect, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";

export const TimeDimensions = {
  x: 0,
  y: 0,
  w: 4,
  h: 5,
  minW: 4,
  minH: 5,
  maxW: 6,
  maxH: 7,
};

const Time = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const { settings } = useSettings();
  const theme = settings.theme;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeFormat = settings.timeFormat === "12hr" ? true : false;

      const timeString = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: timeFormat, // Use settings.timeFormat to set 12-hour or 24-hour clock format
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
  }, [settings.timeFormat]);

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
