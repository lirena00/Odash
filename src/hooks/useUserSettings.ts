import { useState, useEffect } from "react";
import { UserSettings } from "@/types/types";
import { saveSettings, loadSettings } from "@/utils/localStorageUtils";

const defaultSettings: UserSettings = {
  searchEngine: "Google",
  theme: "dark",
  timeFormat: "24",
};

const useUserSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  useEffect(() => {
    const storedSettings = loadSettings();
    if (storedSettings) {
      setSettings(storedSettings);
    }
  }, []);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  return [settings, updateSettings] as const;
};

export default useUserSettings;
