import ColorThief from "colorthief";
import chroma from "chroma-js";

export const getPalette = async (url: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = url;

    image.onload = () => {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(image);
        const hexColors = palette.map((color) => {
          const [r, g, b] = color;
          return `#${((1 << 24) | (r << 16) | (g << 8) | b)
            .toString(16)
            .slice(1)}`;
        });
        resolve(hexColors);
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
