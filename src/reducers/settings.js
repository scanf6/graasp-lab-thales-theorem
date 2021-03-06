import {
  SET_LANGUAGE,
  SET_THEME_COLOR,
  SET_TITLE_STATE,
} from '../actions/types';

const INITIAL_STATE = {
  defaultLang: 'fr',
  themeColor: '#2196f3',
  showTitle: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_LANGUAGE:
      return {
        ...state,
        defaultLang: payload,
      };
    case SET_THEME_COLOR:
      return {
        ...state,
        themeColor: payload,
      };
    case SET_TITLE_STATE:
      return {
        ...state,
        showTitle: payload,
      };
    default:
      return state;
  }
};
