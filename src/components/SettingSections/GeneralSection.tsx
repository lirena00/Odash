import { useSettings } from "@/contexts/SettingsContext";

const GeneralSection = () => {
  const { settings, updateSettings } = useSettings();
  const handleSearchEngineChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateSettings({
      searchEngine: event.target.value as "google" | "bing" | "duckduckgo",
    });
  };

  const handleTimeFormatChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateSettings({ timeFormat: event.target.value as "24hr" | "12hr" });
  };

  const handleTemperatureFormatChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateSettings({
      temperatureFormat: event.target.value as "Fahrenheit" | "Celsius",
    });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({
      city: event.target.value,
    });
  };

  return (
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
          <option value="perplexity">Perplexity</option>
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

      <div className="flex flex-col">
        <span className="font-semibold">Temperature Format</span>
        <select
          className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
          value={settings.temperatureFormat}
          onChange={handleTemperatureFormatChange}
        >
          <option value="Fahrenheit">Fahrenheit</option>
          <option value="Celsius">Celsius</option>
        </select>
      </div>

      <div className="flex flex-col">
        <span className="font-semibold">City</span>
        <input
          className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
          value={settings.city}
          onChange={handleCityChange}
        />
      </div>
    </div>
  );
};
export default GeneralSection;
