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
      className={`p-2 grid place-items-center widget rounded-md w-full h-full ${themeClass}`}
    >
      <Image
        width={75}
        height={75}
        alt="Animood"
        src="https://icons.duckduckgo.com/ip0/netflix.com.ico"
      />
    </div>
  );
};

export default Tile;
