import { useEffect } from 'react';
import { getDominantColor, getContrastingColor } from '@/utils/colorUtils';

const useBackgroundImageWithAccent = (imageUrl: string) => {
  useEffect(() => {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.style.backgroundImage = `url(${imageUrl})`;
      bodyElement.style.backgroundSize = 'cover';
      bodyElement.style.backgroundRepeat = 'no-repeat';
      bodyElement.style.height = '100vh';
    }

    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = 'Anonymous';

    image.onload = () => {
      const dominantColor = getDominantColor(image);
      const contrastingColor = getContrastingColor(dominantColor);
      document.documentElement.style.setProperty('--solid-text-color', contrastingColor);
      document.documentElement.style.setProperty('--accent-color', dominantColor);
    };

    // Clean up the styles when the component unmounts or imageUrl changes
    return () => {
      if (bodyElement) {
        bodyElement.style.backgroundImage = '';
        bodyElement.style.backgroundSize = '';
        bodyElement.style.backgroundRepeat = '';
        bodyElement.style.height = '';
      }
      document.documentElement.style.removeProperty('--accent-color');
    };
  }, [imageUrl]);
};

export default useBackgroundImageWithAccent;
