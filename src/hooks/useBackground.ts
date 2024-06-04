import { useSettings } from "@/contexts/SettingsContext";
import { useEffect } from "react";

const useBackground = () => {
  const { settings } = useSettings();
  const backgroundImage = settings.backgroundImage;
  const backgroundBlur = settings.backgroundBlur;
  const accentColor = settings.accent_color;
  const textColor = settings.text_color;

  useEffect(() => {
    const bodyElement = document.querySelector("body");

    if (bodyElement) {
      bodyElement.style.backgroundImage = `url(${backgroundImage})`;
      bodyElement.style.backgroundSize = "cover";
      bodyElement.style.backgroundRepeat = "no-repeat";
      bodyElement.style.height = "100vh";
      bodyElement.style.zIndex = "-1";
      if (backgroundBlur > 0) {
        bodyElement.style.backdropFilter = `blur(40px)`;
      }
    }

    const image = new Image();
    image.src = backgroundImage;
    image.crossOrigin = "Anonymous";

    image.onload = () => {
      document.documentElement.style.setProperty(
        "--solid-text-color",
        textColor
      );
      document.documentElement.style.setProperty("--accent-color", accentColor);
    };

    // Clean up the styles when the component unmounts or imageUrl changes
    return () => {
      if (bodyElement) {
        bodyElement.style.backgroundImage = "";
        bodyElement.style.backgroundSize = "";
        bodyElement.style.backgroundRepeat = "";
        bodyElement.style.height = "";
        bodyElement.style.backdropFilter = "";
      }
      document.documentElement.style.removeProperty("--accent-color");
      document.documentElement.style.removeProperty("--solid-text-color");
    };
  }, [accentColor, textColor, backgroundImage, backgroundBlur]);
};

export default useBackground;
