import initialState from '../initialState';
import { GET_HOME } from '../actions/actionTypes';

const home = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME:
      return {
        ...state,
        home: action.payload,
      };
    default:
      return initialState;
  }
};

export default home;
