import { useSettings } from "@/contexts/SettingsContext";
import { DiceIcon } from "@/components/Icons/DiceIcon";
import Link from "next/link";

export const TileDimensions = {
  x: 0,
  y: 0,
  w: 2,
  h: 4,
  minH: 4,
  minW: 2,
  maxH: 5,
  maxW: 3,
};
interface TileProps {
  title: string;
  url: string;
  edit: boolean;
}

const Tile: React.FC<TileProps> = ({ title, url, edit }) => {
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
      {title === "Example" ? (
        <div className="text-6xl">
          <DiceIcon />
        </div>
      ) : edit ? (
        <img
          alt="Tile"
          className="m-auto text-lg w-[50px] rounded-md h-[50px] block group-hover:scale-90 transform transition ease-out duration-500 "
          src={`https://www.google.com/s2/favicons?sz=128&domain=${url}`}
        />
      ) : (
        <Link href={url}>
          <img
            alt="Tile"
            className="m-auto text-lg w-[50px] rounded-md h-[50px] block group-hover:scale-90 transform transition ease-out duration-500 "
            src={`https://www.google.com/s2/favicons?sz=128&domain=${url}`}
          />
        </Link>
      )}
      <div className="m-auto w-full  text-lg hidden text-center group-hover:block transform transition ease-out duration-300">
        <span className="text-sm text-center">{title}</span>
      </div>
    </div>
  );
};

export default Tile;
