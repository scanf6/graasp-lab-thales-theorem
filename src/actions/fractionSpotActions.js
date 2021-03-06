import { SET_FRACTION_SPOT, RESET_FRACTION_SPOT, UNSET_FRACTION_SPOT } from '../types/fractionSpotTypes';

export const setFractionSpot = ({ fractionSpot, valueSpot }) => (dispatch) => {
  dispatch({
    type: SET_FRACTION_SPOT,
    fractionSpot,
    valueSpot,
  });
};

export const unsetFractionSpot = valueToUnset => (dispatch) => {
  dispatch({
    type: UNSET_FRACTION_SPOT,
    valueToUnset,
  });
};

export const resetFractionSpot = () => (dispatch) => {
  dispatch({
    type: RESET_FRACTION_SPOT,
  });
};
