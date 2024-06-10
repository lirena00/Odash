import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the user settings
interface UserSettings {
  version: string;
  searchEngine: "google" | "bing" | "duckduckgo" | "perplexity";
  theme: "light" | "dark" | "solid";
  timeFormat: "24hr" | "12hr";
  temperatureFormat: "Fahrenheit" | "Celsius";
  backgroundImage: string;
  backgroundBlur: number;
  city: string;
  accent_color: string;
  text_color: string;
  theme_colors: string[];
}

interface SettingsContextProps {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  version: "1.0.0",
  searchEngine: "google",
  theme: "dark",
  timeFormat: "24hr",
  temperatureFormat: "Celsius",
  city: "",
  backgroundImage: "/wallpaper1.jpg",
  backgroundBlur: 0,
  text_color: "#000000",
  accent_color: "#d6b8a0",
  theme_colors: [
    "#d6b8a0",
    "#52b0bb",
    "#041b35",
    "#24708b",
    "#0d4565",
    "#1c5e72",
    "#2f90ad",
    "#a34c60",
    "#634962",
    "#cf6e48",
  ],
};

// Create the context with default values
const SettingsContext = createContext<SettingsContextProps>({
  settings: defaultSettings,
  updateSettings: () => {},
});

// Provider component
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true); // Flag to check if loading from localStorage

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedSettings = localStorage.getItem("userSettings");
    if (storedSettings) {
      const parsedSettings: UserSettings = JSON.parse(storedSettings);

      // Check for version mismatch
      if (parsedSettings.version !== defaultSettings.version) {
        // Update settings with defaults, but keep existing values where possible
        const updatedSettings = {
          ...defaultSettings,
          ...parsedSettings,
          version: defaultSettings.version, // Ensure the version is updated
        };
        setSettings(updatedSettings);
      } else {
        setSettings(parsedSettings);
      }
    }
    setIsLoading(false); // Loading is complete
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("userSettings", JSON.stringify(settings));
    }
  }, [settings, isLoading]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the Settings context
export const useSettings = () => {
  return useContext(SettingsContext);
};
