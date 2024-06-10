import { useState } from "react";

import Search from "@/components/Widgets/Search";
import Time from "@/components/Widgets/Time";
import Tile from "@/components/Widgets/Tile";
import { NotePreview } from "@/components/Widgets/Note";
import { TodoPreview } from "@/components/Widgets/Todo";
import Todo from "@/components/Widgets/Todo";
import Weather from "@/components/Widgets/Weather";
import Countdown from "@/components/Widgets/Countdown";
import { SearchDimensions } from "@/components/Widgets/Search";
import { TodoDimensions } from "@/components/Widgets/Todo";
import { TimeDimensions } from "@/components/Widgets/Time";
import { TileDimensions } from "@/components/Widgets/Tile";
import { WeatherDimensions } from "@/components/Widgets/Weather";
import { CountdownDimensions } from "@/components/Widgets/Countdown";
import { NoteDimensions } from "@/components/Widgets/Note";

interface SettingsProps {
  addWidget: (
    component: string,
    dimensions: any,
    props?: { [key: string]: any }
  ) => void;
}

const WidgetSection = ({ addWidget }: SettingsProps) => {
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [countdown_title, setCountdown_title] = useState<string>("");
  const [countdown_date, setCountdown_date] = useState<Date>(new Date());
  return (
    <div className="space-y-4">
      <span>Widgets</span>
      <div className="flex flex-col gap-2">
        <div className="p-5 bg-gray-600/50 relative space-y-2  border-gray-600 rounded-md grid place-items-center ">
          <div>
            <div className="relative ">
              <Tile title="Example" url="https://example.com/" />
              <div className="absolute top-0 right-0 w-full h-full"></div>
            </div>
          </div>
          <input
            className="rounded-md bg-transparent w-full px-2 py-1.5 outline-none border-gray-600 border"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            className="rounded-md bg-transparent w-full px-2 py-1.5 outline-none border-gray-600 border"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-white/50  transform transition-all duration-300  text-black px-2 py-1 rounded-full"
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

        <div className="p-5 bg-gray-600/50 relative space-y-2  border-gray-600 rounded-md grid place-items-center ">
          <div>
            <Countdown title="Example" date={new Date()} id="ex" />
          </div>
          <input
            className="rounded-md bg-transparent w-full px-2 py-1.5 outline-none border-gray-600 border"
            placeholder="title"
            value={countdown_title}
            onChange={(e) => setCountdown_title(e.target.value)}
          />
          <input
            type="date"
            className="rounded-md bg-transparent w-full px-2 py-1.5 outline-none border-gray-600 border"
            placeholder="Date"
            onChange={(e) => setCountdown_date(new Date(e.target.value))}
          />
          <button
            className="bg-white/50  transform transition-all duration-300  text-black px-2 py-1 rounded-full"
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

        <div className="p-5 bg-gray-600/50 relative group border-gray-600 rounded-md ">
          <NotePreview />
          <div className="absolute top-0 right-0 p-2 w-full h-full grid place-items-center ">
            <button
              className="bg-white/50  transform transition-all duration-300 group-hover:opacity-100 opacity-0 text-black px-2 py-1 rounded-full"
              onClick={() =>
                addWidget("Note", NoteDimensions, {
                  title: "Note",
                  description: "",
                })
              }
            >
              Add Note
            </button>
          </div>
        </div>

        <div className="p-5 bg-gray-600/50 relative group border-gray-600 rounded-md ">
          <TodoPreview />
          <div className="absolute top-0 right-0 p-2 w-full h-full grid place-items-center ">
            <button
              className="bg-white/50  transform transition-all duration-300 group-hover:opacity-100 opacity-0 text-black px-2 py-1 rounded-full"
              onClick={() =>
                addWidget("Todo", TodoDimensions, { title: "Todo", todos: [] })
              }
            >
              Add Todo
            </button>
          </div>
        </div>

        <div className="p-5 bg-gray-600/50 relative group border-gray-600 rounded-md ">
          <Search />
          <div className="absolute top-0 right-0 p-2 w-full h-full grid place-items-center ">
            <button
              className="bg-white/50  transform transition-all duration-300 group-hover:opacity-100 opacity-0 text-black px-2 py-1 rounded-full"
              onClick={() => addWidget("Search", SearchDimensions)}
            >
              Add Search
            </button>
          </div>
        </div>

        <div className="p-5 bg-gray-600/50 relative group border-gray-600 rounded-md ">
          <Time />
          <div className="absolute top-0 right-0 p-2 w-full h-full grid place-items-center ">
            <button
              className="bg-white/50  transform transition-all duration-300 group-hover:opacity-100 opacity-0 text-black px-2 py-1 rounded-full"
              onClick={() => addWidget("Time", TimeDimensions)}
            >
              Add Time
            </button>
          </div>
        </div>

        <div className="p-5 bg-gray-600/50 relative group border-gray-600 rounded-md ">
          <Weather />
          <div className="absolute top-0 right-0 p-2 w-full h-full grid place-items-center ">
            <button
              className="bg-white/50  transform transition-all duration-300 group-hover:opacity-100 opacity-0 text-black px-2 py-1 rounded-full"
              onClick={() => addWidget("Weather", WeatherDimensions)}
            >
              Add Weather
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetSection;
