import { motion } from "framer-motion";
import { useState } from "react";

import { GithubIcon } from "@/components/Icons/GithubIcon";
import { DiscordIcon } from "@/components/Icons/DiscordIcon";

import GeneralSection from "@/components/SettingSections/GeneralSection";
import AppearanceSection from "@/components/SettingSections/AppearanceSection";
import WidgetSection from "@/components/SettingSections/WidgetSection";
import BackupSection from "@/components/SettingSections/BackupSection";

const Settings = () => {
  const [active, setActive] = useState("general");

  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0, x: -20 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="h-screen w-[500px] gap-4 p-2 z-10 backdrop-blur-lg bg-black/80 flex absolute left-full"
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
          <li
            onClick={() => setActive("backup")}
            className={`cursor-pointer py-1.5 px-2 text-sm rounded-sm ${
              active === "backup"
                ? "bg-gray-800/60 border-l-2"
                : "hover:bg-gray-600/30"
            }`}
          >
            Backup
          </li>
        </ul>

        <div className="mt-auto space-y-2 px-2 py-1.5 -m-2">
          <div className="flex text-xl items-center justify-center text-gray-400 gap-2">
            <GithubIcon />
            <DiscordIcon />
          </div>
          <div className="text-center text-gray-400">
            <span className="text-sm">Odash</span>
          </div>
        </div>
      </div>
      <div className="p-2 max-h-screen overflow-y-auto w-2/3 -mr-2">
        {active === "general" && <GeneralSection />}
        {active === "appearance" && <AppearanceSection />}
        {active === "widgets" && <WidgetSection />}
        {active === "backup" && <BackupSection />}
      </div>
    </motion.div>
  );
};

export default Settings;
