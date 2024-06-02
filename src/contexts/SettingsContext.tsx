import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the user settings
interface UserSettings {
  searchEngine: "google" | "bing" | "duckduckgo";
  theme: "light" | "dark" | "solid";
  timeFormat: "24hr" | "12hr";
  temperatureFormat: "Fahrenheit" | "Celsius";
  backgroundImage: string;
  backgroundBlur: number;
  city: string;
  theme_colors: string[];
}

interface SettingsContextProps {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  searchEngine: "google",
  theme: "dark",
  timeFormat: "24hr",
  temperatureFormat: "Celsius",
  city: "",
  backgroundImage: "/wallpaper1.jpg",
  backgroundBlur: 0,
  theme_colors: [
    "rgb(214, 184, 160)",
    "rgb(82, 176, 187)",
    "rgb(4, 27, 53)",
    "rgb(36, 112, 139)",
    "rgb(13, 69, 101)",
    "rgb(28, 94, 114)",
    "rgb(47, 144, 173)",
    "rgb(163, 76, 96)",
    "rgb(99, 73, 98)",
    "rgb(207, 110, 72)",
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
      setSettings(JSON.parse(storedSettings));
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
