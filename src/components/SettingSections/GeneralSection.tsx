import { useSettings } from "@/contexts/SettingsContext";
import * as Select from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { debounce } from "lodash";
import { useCallback } from "react";

const GeneralSection = () => {
  const { settings, updateSettings } = useSettings();

  const searchEngineOptions = [
    { value: "google", label: "Google" },
    { value: "bing", label: "Bing" },
    { value: "duckduckgo", label: "Duckduckgo" },
    { value: "perplexity", label: "Perplexity" },
  ];

  const timeFormatOptions = ["24hr", "12hr"];
  const temperatureFormatOptions = ["Fahrenheit", "Celsius"];

  const handleSearchEngineChange = (value: string) => {
    updateSettings({
      searchEngine: value as "google" | "bing" | "duckduckgo" | "perplexity",
    });
  };

  const handleTimeFormatChange = (value: string) => {
    updateSettings({ timeFormat: value as "24hr" | "12hr" });
  };

  const handleTemperatureFormatChange = (value: string) => {
    updateSettings({
      temperatureFormat: value as "Fahrenheit" | "Celsius",
    });
  };

  const handleCityChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      updateSettings({
        city: event.target.value,
      });
    }, 2000),
    []
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <span className="font-semibold">Search Engine</span>
        <Select.Root
          value={settings.searchEngine}
          onValueChange={handleSearchEngineChange}
        >
          <Select.Trigger className="rounded-md bg-transparent px-2 py-1.5 outline-none border-gray-300 border inline-flex items-center justify-between">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-20 rounded-md bg-black border p-1 outline-none border-gray-300">
              <Select.ScrollUpButton className="flex items-center justify-center">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport>
                {searchEngineOptions.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="px-1 py-1.5 hover:bg-gray-800/60 flex items-center justify-between cursor-pointer"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex items-center justify-center">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className="flex flex-col">
        <span className="font-semibold">Time Format</span>
        <Select.Root
          value={settings.timeFormat}
          onValueChange={handleTimeFormatChange}
        >
          <Select.Trigger className="rounded-md bg-transparent px-2 py-1.5 outline-none border-gray-300 border inline-flex items-center justify-between">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-20 rounded-md bg-black border p-1 outline-none border-gray-300">
              <Select.ScrollUpButton className="flex items-center justify-center">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport>
                {timeFormatOptions.map((option) => (
                  <Select.Item
                    key={option}
                    value={option}
                    className="px-1 py-1.5 hover:bg-gray-800/60 flex items-center justify-between cursor-pointer"
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex items-center justify-center">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className="flex flex-col">
        <span className="font-semibold">Temperature Format</span>
        <Select.Root
          value={settings.temperatureFormat}
          onValueChange={handleTemperatureFormatChange}
        >
          <Select.Trigger className="rounded-md bg-transparent px-2 py-1.5 outline-none border-gray-300 border inline-flex items-center justify-between">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-20 rounded-md bg-black border p-1 outline-none border-gray-300">
              <Select.ScrollUpButton className="flex items-center justify-center">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport>
                {temperatureFormatOptions.map((option) => (
                  <Select.Item
                    key={option}
                    value={option}
                    className="px-1 py-1.5 hover:bg-gray-800/60 flex items-center justify-between cursor-pointer"
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex items-center justify-center">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className="flex flex-col">
        <span className="font-semibold">City</span>
        <input
          className="rounded-md bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
          defaultValue={settings.city}
          onChange={handleCityChange}
        />
      </div>
    </div>
  );
};
export default GeneralSection;
