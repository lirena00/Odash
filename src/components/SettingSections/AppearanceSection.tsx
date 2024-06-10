import { useSettings } from "@/contexts/SettingsContext";
import { useEffect, useState } from "react";
import { getContrastingColor, getPalette } from "@/utils/colorUtils";
import { debounce } from "lodash";

import * as Select from "@radix-ui/react-select";
import * as Slider from "@radix-ui/react-slider";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

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

  const themeOptions = [
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "solid", label: "Solid" },
  ];

  const wallpapers = [
    "/wallpaper1.jpg",
    "/wallpaper2.jpg",
    "/wallpaper3.jpg",
    "/wallpaper4.jpg",
    "/wallpaper5.jpg",
  ];

  const handleThemeChange = (value: string) => {
    updateSettings({ theme: value as "light" | "dark" | "solid" });
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

  const handleBlurChange = (value: number[]) => {
    const newBlur = value[0];
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
        <Select.Root value={settings.theme} onValueChange={handleThemeChange}>
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
                {themeOptions.map((option) => (
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

      <div className="flex flex-col space-y-1">
        <span className="font-semibold">Wallpaper</span>
        <div className="relative h-full w-full aspect-[16/9] group">
          <img
            src={settings.backgroundImage}
            alt="Wallpaper"
            className="rounded-md border w-full h-full   border-gray-300 brightness-50"
          />
          <div className="px-2 text-center py-1 rounded-md bg-gray-300/20 border-gray-300 border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Current wallpaper
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {wallpapers.map((wallpaper, index) => (
            <img
              key={index}
              className={`rounded-md ${
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
          className="rounded-md bg-transparent px-2 py-1.5 outline-none border-gray-300 border"
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
        <span className="font-semibold">Background Blur</span>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[backgroundBlur]}
          onValueChange={handleBlurChange}
          max={50}
          step={1}
          aria-label="Background Blur"
        >
          <Slider.Track className="bg-gray-300 relative flex-grow rounded-full h-1">
            <Slider.Range className="absolute bg-gray-600 h-full rounded-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-4 h-4 bg-gray-600 rounded-full focus:shadow-[0_0_0_5px] focus:shadow-black/50" />
        </Slider.Root>
      </div>
    </div>
  );
};

export default AppearanceSection;
