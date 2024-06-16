import Settings from "@/components/Settings";
import Chat from "@/components/Chat";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import { SettingIcon } from "@/components/Icons/SettingIcon";
import { EditIcon } from "@/components/Icons/EditIcon";
import { SparkleIcon } from "@/components/Icons/SparkleIcon";

interface NavProps {
  edit: boolean;
  setEdit: (edit: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ edit, setEdit }) => {
  const [tab, setTab] = useState("");
  const settingsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      settingsRef.current &&
      !settingsRef.current.contains(event.target as Node)
    ) {
      setTab("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={settingsRef} className="relative flex">
      <div className="h-screen text-2xl w-fit p-2 backdrop-blur-lg bg-black/80 flex flex-col">
        <div></div>

        <div className="mt-auto gap-2 flex flex-col">
          <button
            onClick={() => setTab((prevTab) => (prevTab === "ai" ? "" : "ai"))}
          >
            <SparkleIcon />
          </button>
          <button onClick={() => setEdit(!edit)}>
            <EditIcon />
          </button>
          <button
            onClick={() =>
              setTab((prevTab) => (prevTab === "settings" ? "" : "settings"))
            }
          >
            <SettingIcon />
          </button>
        </div>
      </div>

      <AnimatePresence>{tab === "settings" && <Settings />}</AnimatePresence>
      <AnimatePresence>{tab === "ai" && <Chat />}</AnimatePresence>
    </div>
  );
};

export default Nav;
