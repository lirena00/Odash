import { motion } from "framer-motion";
import { GithubIcon } from "@/components/Icons/GithubIcon";
import { DiscordIcon } from "@/components/Icons/DiscordIcon";
import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { SearchDimensions } from "@/components/Widgets/Search";
import { TodoDimensions } from "@/components/Widgets/Todo";
import { TimeDimensions } from "@/components/Widgets/Time";
import { TileDimensions } from "@/components/Widgets/Tile";
import { WeatherDimensions } from "@/components/Widgets/Weather";
import { CountdownDimensions } from "@/components/Widgets/Countdown";
import { NoteDimensions } from "@/components/Widgets/Note";

import { getContrastingColor } from "@/utils/colorUtils";

interface SettingsProps {
  addWidget: (
    component: string,
    dimensions: any,
    props?: { [key: string]: any }
  ) => void;
}

const Settings = ({ addWidget }: SettingsProps) => {
  const { settings, updateSettings } = useSettings();
  const [active, setActive] = useState("general");
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [countdown_title, setCountdown_title] = useState<string>("");
  const [countdown_date, setCountdown_date] = useState<Date>(new Date());
  const [backgroundBlur, setBackgroundBlur] = useState<number>(
    settings.backgroundBlur
  );

  const getInitialColor = () =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-color")
      .trim();
  const [customColor, setCustomColor] = useState(getInitialColor);
  const wallpapers = [
    "/wallpaper1.jpg",
    "/wallpaper2.jpg",
    "/wallpaper3.jpg",
    "/wallpaper4.jpg",
    "/wallpaper5.jpg",
  ];
  const handleSearchEngineChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateSettings({
      searchEngine: event.target.value as "google" | "bing" | "duckduckgo",
    });
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ theme: event.target.value as "light" | "dark" | "solid" });
  };

  const handleTimeFormatChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateSettings({ timeFormat: event.target.value as "24hr" | "12hr" });
  };

  const handleTemperatureFormatChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateSettings({
      temperatureFormat: event.target.value as "Fahrenheit" | "Celsius",
    });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({
      city: event.target.value,
    });
  };

  const handleWallpaperChange = (url: string) => {
    updateSettings({ backgroundImage: url });
  };

  const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlur = parseInt(event.target.value);
    setBackgroundBlur(newBlur);
    updateSettings({ ...settings, backgroundBlur: newBlur });
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      const imagePattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
      return imagePattern.test(url);
    } catch (e) {
      return false;
    }
  };

  const handleWallpaperURLChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = e.target.value;

    if (isValidUrl(inputValue)) {
      updateSettings({ backgroundImage: inputValue });
    }
  };

  const handleCustomColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = event.target.value;
    setCustomColor(color);
    document.documentElement.style.setProperty("--accent-color", color);
    const contrastingColor = getContrastingColor(color);
    document.documentElement.style.setProperty(
      "--solid-text-color",
      contrastingColor
    );
  };
  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0, x: -20 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="h-screen w-[500px] gap-4 p-2 z-40 backdrop-blur-lg bg-black/80 flex absolute left-full"
    >
      <div className="w-1/3 space-y-4 flex flex-col">
        <span className="font-semibold text-lg">Settings</span>
        <ul className="h-full space-y-1">
          <li
            onClick={() => setActive("general")}
            className={`cursor-pointer py-1.5 px-2 text-sm rounded-sm ${
              active === "general"
                ? "bg-gray-800/60 border-l-2"
                : "hover:bg-gray-600/30"
            }`}
          >
            General
          </li>
          <li
            onClick={() => setActive("appearance")}
            className={`cursor-pointer py-1.5 px-2 text-sm rounded-sm ${
              active === "appearance"
                ? "bg-gray-800/60 border-l-2"
                : "hover:bg-gray-600/30"
            }`}
          >
            Appearance
          </li>
          <li
            onClick={() => setActive("widgets")}
            className={`cursor-pointer py-1.5 px-2 text-sm rounded-sm ${
              active === "widgets"
                ? "bg-gray-800/60 border-l-2"
                : "hover:bg-gray-600/30"
            }`}
          >
            Widgets
          </li>
        </ul>

        <div className="mt-auto space-y-2 px-2 py-1.5 -m-2">
          <div className="flex text-xl items-center justify-center text-gray-400 gap-2">
            <GithubIcon />
            <DiscordIcon />
          </div>
          <div className="text-center text-gray-400">
            <span className="text-sm">Redash</span>
          </div>
        </div>
      </div>
      <div className="p-2 max-h-screen overflow-y-auto w-2/3 -mr-2">
        {active === "general" && (
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-semibold">Search Engine</span>
              <select
                className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
                value={settings.searchEngine}
                onChange={handleSearchEngineChange}
              >
                <option value="google">Google</option>
                <option value="bing">Bing</option>
                <option value="duckduckgo">Duckduckgo</option>
                <option value="perplexity">Perplexity</option>
              </select>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">Time Format</span>
              <select
                className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
                value={settings.timeFormat}
                onChange={handleTimeFormatChange}
              >
                <option value="24hr">24 Hour</option>
                <option value="12hr">12 Hour</option>
              </select>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">Temperature Format</span>
              <select
                className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
                value={settings.temperatureFormat}
                onChange={handleTemperatureFormatChange}
              >
                <option value="Fahrenheit">Fahrenheit</option>
                <option value="Celsius">Celsius</option>
              </select>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">City</span>
              <input
                className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
                value={settings.city}
                onChange={handleCityChange}
              />
            </div>
          </div>
        )}

        {active === "appearance" && (
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-semibold">Theme</span>
              <select
                className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
                value={settings.theme}
                onChange={handleThemeChange}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="solid">Solid</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-semibold">Wallpaper</span>
              <div className="relative h-full w-full aspect-[16/9] group">
                <img
                  src={settings.backgroundImage}
                  alt="Wallpaper"
                  className="rounded-sm border w-full h-full   border-gray-300 brightness-50"
                />
                <div className="px-2 text-center py-1 rounded-sm bg-gray-300/20 border-gray-300 border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  Current wallpaper
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {wallpapers.map((wallpaper, index) => (
                  <img
                    key={index}
                    className={`rounded-sm ${
                      settings.backgroundImage === wallpaper ? "hidden" : ""
                    }`}
                    alt={`wallpaper${index + 1}`}
                    src={wallpaper}
                    onClick={() => handleWallpaperChange(wallpaper)}
                  />
                ))}
              </div>
              <input
                onChange={handleWallpaperURLChange}
                placeholder="Enter URL of your wallpaper"
                className="rounded-sm text-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">Colors</span>
              <div className="flex flex-wrap gap-2">
                {settings.theme_colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-transparent px-2 py-1.5 outline-none "
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      document.documentElement.style.setProperty(
                        "--accent-color",
                        color
                      )
                    }
                  />
                ))}
                <input
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="w-8 h-8 rounded-full outline-none overflow-hidden border-none cursor-pointer"
                  style={{ backgroundColor: customColor }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">Theme</span>
              <input
                type="range"
                min="0"
                max="50"
                value={backgroundBlur}
                onChange={handleBlurChange}
                className=""
              />
            </div>
          </div>
        )}

        {active === "widgets" && (
          <div className="space-y-4">
            <span>Widgets</span>
            <div className="flex flex-col gap-2">
              <button
                className="bg-white/50 px-2 py-1"
                onClick={() => addWidget("Search", SearchDimensions)}
              >
                search
              </button>
              <button
                className="bg-white/50 px-2 py-1"
                onClick={() => addWidget("Todo", TodoDimensions)}
              >
                todo
              </button>
              <button
                className="bg-white/50 px-2 py-1"
                onClick={() => addWidget("Time", TimeDimensions)}
              >
                time
              </button>
              <div className="flex flex-col gap-1">
                <input
                  className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
                  placeholder="title"
                  value={countdown_title}
                  onChange={(e) => setCountdown_title(e.target.value)}
                />
                <input
                  type="date"
                  className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
                  placeholder="Date"
                  onChange={(e) => setCountdown_date(new Date(e.target.value))}
                />
                <button
                  className="bg-white/50 px-2 py-1"
                  onClick={() =>
                    addWidget("Countdown", CountdownDimensions, {
                      title: countdown_title,
                      date: new Date(countdown_date),
                    })
                  }
                >
                  Add Countdown
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <input
                  className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <input
                  className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  className="bg-white/50 px-2 py-1"
                  onClick={() =>
                    addWidget("Tile", TileDimensions, {
                      title: title,
                      url: url,
                    })
                  }
                >
                  Add Tile
                </button>
              </div>

              <button
                className="bg-white/50 px-2 py-1"
                onClick={() =>
                  addWidget("Note", NoteDimensions, {
                    title: "Note",
                    description: "",
                  })
                }
              >
                Note
              </button>

              <button
                className="bg-white/50 px-2 py-1"
                onClick={() => addWidget("Weather", WeatherDimensions)}
              >
                weather
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Settings;
