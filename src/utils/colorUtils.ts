import ColorThief from "colorthief";
import chroma from "chroma-js";

export const getDominantColor = (image: HTMLImageElement): string[] => {
  const colorThief = new ColorThief();
  const palette = colorThief.getPalette(image);

  // Convert each color array to an rgb string
  //TODO:chnage function name and redo all the wallpaper settings
  const rgbColors = palette.map(
    (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
  );

  return rgbColors;
};

export const getPalette = async (url: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = url;

    image.onload = () => {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(image);
        const rgbColors = palette.map(
          (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        );
        resolve(rgbColors);
      } catch (error) {
        reject(error);
      }
    };

    image.onerror = (error) => reject(error);
  });
};

export const getContrastingColor = (rgb: string): string => {
  const color = chroma(rgb);
  return color.luminance() > 0.5 ? "#000000" : "#ffffff";
};

/*
export const getDominantColor = (image: HTMLImageElement): string => {

  
  const colorThief = new ColorThief();
  const color = colorThief.getPalette(image)[0];
  
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};
*/
