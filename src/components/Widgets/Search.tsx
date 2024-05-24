import { GoogleIcon } from "@/components/Icons/GoogleIcon";
import { useSettings } from "@/contexts/SettingsContext";

export const SearchDimensions = {
  x: 0,
  y: 0,
  w: 4,
  h: 5,
  minW: 4,
  minH: 5,
  maxW: 6,
  maxH: 7,
};

const Search = () => {
  const { settings } = useSettings();
  const theme = settings.theme;
  return (
    <div
      className={`widget w-full h-full flex gap-2 rounded-md ${
        theme === "dark"
          ? "dark"
          : theme === "light"
          ? "light"
          : "bg-accent text-solid-text"
      } `}
    >
      <div className="text-2xl grid place-items-center w-fit px-2 py-1">
        <GoogleIcon />
      </div>
      <input
        type="text"
        className={`w-full bg-transparent outline-none px-1 `}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
