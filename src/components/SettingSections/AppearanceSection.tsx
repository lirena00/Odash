import { useSettings } from "@/contexts/SettingsContext";
import { useEffect, useState } from "react";
import { getContrastingColor, getPalette } from "@/utils/colorUtils";
import { debounce } from "lodash";

const AppearanceSection = () => {
  const { settings, updateSettings } = useSettings();
  const [backgroundBlur, setBackgroundBlur] = useState<number>(
    settings.backgroundBlur
  );

  const getInitialColor = () =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-color")
      .trim();
  const [customColor, setCustomColor] = useState(getInitialColor);
  const wallpapers = [
    "/wallpaper1.jpg",
    "/wallpaper2.jpg",
    "/wallpaper3.jpg",
    "/wallpaper4.jpg",
    "/wallpaper5.jpg",
  ];

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ theme: event.target.value as "light" | "dark" | "solid" });
  };

  const handleWallpaperChange = async (url: string) => {
    const palette = await getPalette(url);
    const accentColor = palette[0];
    const textColor = getContrastingColor(palette[0]);
    updateSettings({
      backgroundImage: url,
      theme_colors: palette,
      accent_color: accentColor,
      text_color: textColor,
    });
  };

  const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlur = parseInt(event.target.value);
    setBackgroundBlur(newBlur);
    updateSettings({ ...settings, backgroundBlur: newBlur });
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      const imagePattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
      return imagePattern.test(url);
    } catch (e) {
      return false;
    }
  };

  const handleWallpaperURLChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = e.target.value;

    if (isValidUrl(inputValue)) {
      handleWallpaperChange(inputValue);
    }
  };

  const handleCustomColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = event.target.value;
    setCustomColor(color);

    document.documentElement.style.setProperty("--accent-color", color);
    const contrastingColor = getContrastingColor(color);
    document.documentElement.style.setProperty(
      "--solid-text-color",
      contrastingColor
    );
  };

  useEffect(() => {
    const handleDebounce = debounce(() => {
      const contrastingColor = getContrastingColor(customColor);
      updateSettings({
        accent_color: customColor,
        text_color: contrastingColor,
      });
    }, 2000);

    handleDebounce();

    return () => {
      handleDebounce.cancel();
    };
  }, [customColor, updateSettings]);

  const handleColorChange = (color: string) => {
    //convert color to rgb

    updateSettings({
      accent_color: color,
      text_color: getContrastingColor(color),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <span className="font-semibold">Theme</span>
        <select
          className="rounded-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
          value={settings.theme}
          onChange={handleThemeChange}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="solid">Solid</option>
        </select>
      </div>

      <div className="flex flex-col space-y-1">
        <span className="font-semibold">Wallpaper</span>
        <div className="relative h-full w-full aspect-[16/9] group">
          <img
            src={settings.backgroundImage}
            alt="Wallpaper"
            className="rounded-sm border w-full h-full   border-gray-300 brightness-50"
          />
          <div className="px-2 text-center py-1 rounded-sm bg-gray-300/20 border-gray-300 border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Current wallpaper
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {wallpapers.map((wallpaper, index) => (
            <img
              key={index}
              className={`rounded-sm ${
                settings.backgroundImage === wallpaper ? "hidden" : ""
              }`}
              alt={`wallpaper${index + 1}`}
              src={wallpaper}
              onClick={() => handleWallpaperChange(wallpaper)}
            />
          ))}
        </div>
        <input
          onChange={handleWallpaperURLChange}
          placeholder="Enter URL of your wallpaper"
          className="rounded-sm text-sm bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
        />
      </div>

      <div className="flex flex-col">
        <span className="font-semibold">Colors</span>
        <div className="flex flex-wrap gap-2">
          {settings.theme_colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-transparent px-2 py-1.5 outline-none "
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            />
          ))}
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="w-8 h-8 rounded-full outline-none overflow-hidden border-none cursor-pointer"
            style={{ backgroundColor: customColor }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-semibold">Theme</span>
        <input
          type="range"
          min="0"
          max="50"
          value={backgroundBlur}
          onChange={handleBlurChange}
          className=""
        />
      </div>
    </div>
  );
};

export default AppearanceSection;
