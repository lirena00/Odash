import { useEffect } from "react";
import { getDominantColor, getContrastingColor } from "@/utils/colorUtils";
import { useSettings } from "@/contexts/SettingsContext";

const useBackgroundImageWithAccent = (imageUrl: string) => {
  const { settings, updateSettings } = useSettings();
  useEffect(() => {
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.style.backgroundImage = `url(${settings.backgroundImage})`;
      bodyElement.style.backgroundSize = "cover";
      bodyElement.style.backgroundRepeat = "no-repeat";
      bodyElement.style.height = "100vh";
    }

    const image = new Image();
    image.src = settings.backgroundImage;
    image.crossOrigin = "Anonymous";

    image.onload = () => {
      const all_color = getDominantColor(image);

      const dominantColor = all_color[0];
      const contrastingColor = getContrastingColor(dominantColor);
      document.documentElement.style.setProperty(
        "--solid-text-color",
        contrastingColor
      );
      document.documentElement.style.setProperty(
        "--accent-color",
        dominantColor
      );
    };

    // Clean up the styles when the component unmounts or imageUrl changes
    return () => {
      if (bodyElement) {
        bodyElement.style.backgroundImage = "";
        bodyElement.style.backgroundSize = "";
        bodyElement.style.backgroundRepeat = "";
        bodyElement.style.height = "";
      }
      document.documentElement.style.removeProperty("--accent-color");
    };
  }, [imageUrl, settings.backgroundImage]);
};

export default useBackgroundImageWithAccent;
