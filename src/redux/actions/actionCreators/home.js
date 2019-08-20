import { GET_HOME } from '../actionTypes';

export function getHome() {
  return {
    type: GET_HOME,
    payload: 'Authors Haven in the Blime',
  };
}
