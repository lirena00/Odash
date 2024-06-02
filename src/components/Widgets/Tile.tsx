import { useSettings } from "@/contexts/SettingsContext";

export const TileDimensions = {
  x: 0,
  y: 0,
  w: 2,
  h: 5,
};
interface TileProps {
  name: string;
  url: string;
  id: string;
}

const Tile: React.FC<TileProps> = ({ name, url }) => {
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
      <img
        alt="Tile"
        className="m-auto text-lg w-[50px] h-[50px] block group-hover:scale-90 transform transition ease-out duration-500 "
        src={`https://www.google.com/s2/favicons?sz=128&domain=${url}`}
      />

      <div className="m-auto w-full  text-lg hidden text-center group-hover:block transform transition ease-out duration-300">
        <span className="text-sm text-center">{name}</span>
      </div>
    </div>
  );
};

export default Tile;
