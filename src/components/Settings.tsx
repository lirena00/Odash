import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

import { GithubIcon } from "@/components/Icons/GithubIcon";
import { DiscordIcon } from "@/components/Icons/DiscordIcon";
import { BackupIcon } from "@/components/Icons/BackupIcon";
import { WidgetIcon } from "@/components/Icons/WidgetIcon";
import { GeneralIcon } from "@/components/Icons/GeneralIcon";
import { PalleteIcon } from "@/components/Icons/PalleteIcon";

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
            className={`cursor-pointer py-1.5 px-2 text-sm rounded-sm flex gap-2  items-center ${
              active === "general"
                ? "bg-gray-800/60 border-l-2"
                : "hover:bg-gray-600/30"
            }`}
          >
            <span className="text-xl">
              <GeneralIcon />
            </span>
            <span>General</span>
          </li>
          <li
            onClick={() => setActive("appearance")}
            className={`cursor-pointer py-1.5 px-2 text-sm rounded-sm flex gap-2  items-center ${
              active === "appearance"
                ? "bg-gray-800/60 border-l-2"
                : "hover:bg-gray-600/30"
            }`}
          >
            <span className="text-xl">
              <PalleteIcon />
            </span>
            <span>Appearance</span>
          </li>
          <li
            onClick={() => setActive("widgets")}
            className={`cursor-pointer py-1.5 px-2 text-sm rounded-sm flex gap-2  items-center  ${
              active === "widgets"
                ? "bg-gray-800/60 border-l-2"
                : "hover:bg-gray-600/30"
            }`}
          >
            <span className="text-xl">
              <WidgetIcon />
            </span>
            <span>Widgets</span>
          </li>
          <li
            onClick={() => setActive("backup")}
            className={`cursor-pointer py-1.5 px-2 text-sm rounded-sm flex gap-2  items-center  ${
              active === "backup"
                ? "bg-gray-800/60 border-l-2"
                : "hover:bg-gray-600/30"
            }`}
          >
            <span className="text-xl">
              <BackupIcon />
            </span>
            <span>Backup</span>
          </li>
        </ul>

        <div className="mt-auto space-y-2 px-2 py-1.5 -m-2">
          <div className="flex text-xl items-center justify-center text-gray-400 gap-2">
            <Link href="https://github.com/lirena00/odash" target="_blank">
              <GithubIcon />
            </Link>
            <Link href="https://discord.com/invite/X9VejqEG2Z" target="_blank">
              <DiscordIcon />
            </Link>
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
