import { GET_HOME } from '../actionTypes';

export const getHome = () => (dispatch) => {
  dispatch({
    type: GET_HOME,
    payload: 'Authors Haven in the Blime',
  });
};
