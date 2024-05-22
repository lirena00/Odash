import { useEffect, useState } from "react";

const Time = ({ theme }: { theme: string }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeString = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Set to false for 24-hour clock format
      });
      setTime(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`p-2 grid place-items-center widget-header rounded-md  w-full h-full ${
        theme === "dark"
          ? "dark"
          : theme === "light"
          ? "light "
          : "bg-accent text-solid-text"
      } `}
    >
      <div className=" text-4xl font-bold">{time}</div>
      <div>Mon , 14 may</div>
    </div>
  );
};

export default Time;
