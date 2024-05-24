import { motion } from "framer-motion";
import { GithubIcon } from "@/components/Icons/GithubIcon";
import { DiscordIcon } from "@/components/Icons/DiscordIcon";
import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";

const Settings = () => {
  const [active, setActive] = useState("general");
  const { settings, updateSettings } = useSettings();

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

  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0, x: -20 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="h-screen w-[500px] gap-4 p-2 z-40 backdrop-blur-lg bg-black/70 flex absolute left-full"
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
            onClick={() => setActive("theme")}
            className={`cursor-pointer py-1.5 px-2 text-sm rounded-sm ${
              active === "theme"
                ? "bg-gray-800/60 border-l-2"
                : "hover:bg-gray-600/30"
            }`}
          >
            Theme
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
          </div>
        )}

        {active === "theme" && (
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
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Settings;
