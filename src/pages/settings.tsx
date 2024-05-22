import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState("general");
  return (
    <main className={`flex min-h-screen gap-4  `}>
      <div className="p-4 w-[20vw] bg-primary/20 ">
        <span className="font-semibold text-2xl">Settings</span>
        <div className="py-4">
          <ul className="gap-1 flex flex-col">
            <li
              className={`cursor-pointer p-1.5 text-sm rounded-sm px-2 ${
                active == "general"
                  ? "bg-primary/40 border-l-2"
                  : "hover:bg-primary/30 "
              } `}
            >
              General
            </li>
            <li
              onClick={() => setActive("background")}
              className={`cursor-pointer p-1.5 text-sm rounded-sm px-2 ${
                active == "background"
                  ? "bg-primary/40 border-l-2"
                  : "hover:bg-primary/30 "
              } `}
            >
              Background
            </li>
          </ul>
        </div>
      </div>

      <div>
        {active == "general" ? (
          <div className="p-4 ">
            <span className="font-semibold text-2xl">General</span>
          </div>
        ) : null}

        {active == "background" ? (
          <div className="p-4 space-y-4 ">
            <span className="font-semibold text-2xl">Background</span>
            <div className="space-y-4">
              <select className="bg-background px-4 py-2 outline-none border-accent border">
                <option className="px-4 py-2">Default</option>
                <option>Use your Own Image</option>
                <option>Use CSS Backgrounds</option>
              </select>

              <div>
                <span className="block text-sm">Upload Your Own Image</span>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="file"
                    className="h-8 w-16 rounded-sm border border-accent"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
