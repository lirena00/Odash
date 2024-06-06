import { useState } from "react";

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
  );
};

export default WidgetSection;
