import { THEME_CHANGED } from "../actions/theme";

const INITIAL_THEME = {
  theme: 'lightmode',
};

const reducer = (state = INITIAL_THEME, action) => {
  switch (action.type) {
    case THEME_CHANGED:
      return {
        ...state,
        theme: action.theme,
      };

    default: return state;
  }
};

export default reducer;