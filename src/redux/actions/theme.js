export const THEME_CHANGED = 'THEME_CHANGED';

export const updateTheme = (theme) => {
  return {
    theme,
    type: THEME_CHANGED
  };
};

export const temp = {};