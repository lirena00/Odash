import { UserSettings } from "@/types/types";

const SETTINGS_KEY = "userSettings";

export const saveSettings = (settings: UserSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const loadSettings = (): UserSettings | null => {
  const settings = localStorage.getItem(SETTINGS_KEY);
  return settings ? JSON.parse(settings) : null;
};

export const clearSettings = () => {
  localStorage.removeItem(SETTINGS_KEY);
};
