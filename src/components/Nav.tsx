import { SettingIcon } from "@/components/Icons/SettingIcon";
import Settings from "@/components/Settings";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

const Nav = () => {
  const [tab, setTab] = useState("");

  return (
    <div className="relative flex">
      <div className="h-screen text-2xl w-fit p-2 backdrop-blur-lg bg-black/70 flex flex-col">
        <button
          className="mt-auto group relative"
          onClick={() => {
            setTab((prevTab) => (prevTab === "settings" ? "" : "settings"));
          }}
        >
          <SettingIcon />
          <div className="absolute bottom-full z-50 mb-2 w-max bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Settings
          </div>
        </button>
      </div>

      <AnimatePresence>{tab === "settings" && <Settings />}</AnimatePresence>
    </div>
  );
};

export default Nav;
