import { useEffect, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import Image from "next/image";

export const TileDimensions = {
  x: 0,
  y: 0,
  w: 2,
  h: 5,
};

const Tile = () => {
  const { settings } = useSettings();
  const theme = settings.theme;
  const themeClass =
    theme === "dark"
      ? "dark"
      : theme === "light"
      ? "light"
      : "bg-accent text-solid-text";

  return (
    <div
      className={`group p-2 grid place-items-center widget rounded-md w-full h-full ${themeClass}`}
    >
      <Image
        width={50}
        height={50}
        alt="Animood"
        className="m-auto text-lg  block group-hover:scale-90 transform transition ease-out duration-500 "
        src="https://icons.duckduckgo.com/ip0/netflix.com.ico"
      />
      <div className="m-auto w-full  text-lg hidden text-center group-hover:block transform transition ease-out duration-300">
        <span className="text-sm text-center">Netflix</span>
      </div>
    </div>
  );
};

export default Tile;
