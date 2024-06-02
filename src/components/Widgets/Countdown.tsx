import { useSettings } from "@/contexts/SettingsContext";

export const CountdownDimensions = {
  x: 0,
  y: 0,
  w: 2,
  h: 5,
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

  return (
    <div
      className={`group p-2 grid place-items-center widget rounded-md w-full h-full ${themeClass}`}
    >
      <div className="m-auto w-full  text-lg hidden text-center group-hover:block transform transition ease-out duration-300">
        <span className="text-sm text-center">25 days</span>
      </div>
      <div className="m-auto w-full  text-lg hidden text-center group-hover:block transform transition ease-out duration-300">
        <span className="text-sm text-center">{title}</span>
      </div>
    </div>
  );
};

export default Countdown;
