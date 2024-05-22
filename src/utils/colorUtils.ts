import ColorThief from 'colorthief';
import chroma from 'chroma-js';

export const getDominantColor = (image: HTMLImageElement): string => {
  const colorThief = new ColorThief();
  const color = colorThief.getPalette(image)[0];
  console.log(color);
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};

export const getContrastingColor = (rgb: string): string => {
  const color = chroma(rgb);
  // Calculate contrasting color (e.g., complementary color)
  //const contrastingColor = color.luminance() > 0.5 ? '#ffffff' : '#000000';
  return color.luminance() > 0.5 ? '#000000' : '#ffffff';
};
