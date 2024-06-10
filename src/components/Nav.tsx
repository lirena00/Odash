import { SettingIcon } from "@/components/Icons/SettingIcon";
import Settings from "@/components/Settings";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { EditIcon } from "@/components/Icons/EditIcon";

interface NavProps {
  edit: boolean;
  setEdit: (edit: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ edit, setEdit }) => {
  const [tab, setTab] = useState("");

  return (
    <div className="relative flex">
      <div className="h-screen text-2xl w-fit p-2  backdrop-blur-lg bg-black/80 flex flex-col">
        <div className="mt-auto  gap-2 flex flex-col ">
          <button className="" onClick={() => setEdit(!edit)}>
            <EditIcon />
          </button>
          <button
            className=""
            onClick={() => {
              setTab((prevTab) => (prevTab === "settings" ? "" : "settings"));
            }}
          >
            <SettingIcon />
          </button>
        </div>
      </div>

      <AnimatePresence>{tab === "settings" && <Settings />}</AnimatePresence>
    </div>
  );
};

export default Nav;
