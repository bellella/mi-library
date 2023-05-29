import { Media, Theme } from "types";

export const applyUnit = (numberOrPxOrArray, theme: Theme) => {
  if (numberOrPxOrArray instanceof Array) {
    return numberOrPxOrArray.map(numberOrPx => applyUnit(numberOrPx, theme)).join(' ');
  } else {
    return isNaN(numberOrPxOrArray) ? numberOrPxOrArray : (numberOrPxOrArray * theme.unit) + 'px'
  }
}

export const applyMedia = (media: Media<any>, theme: Theme, func: (any) => any) => {
  return Object.keys(media).reduce((acc, value) => ({
    ...acc,
    [theme.media[value]]: {
      ...func(media[value])
    }
  }), {});
}

export const applyColor = (colorName: string, theme: Theme) => {
  const themeColor = theme.color[colorName];
  if (themeColor) {
    return themeColor;
  } else if (colorName.startsWith('#')) {
    return colorName;
  } else {
    return `var(--color-${colorName}, ${colorName})`;
  }
}