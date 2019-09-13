import {
  OPTED_IN_OUT,
  OPTED_IN_OUT_FAIL,
} from '../actions/actionTypes/profile';

const initialState = {
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPTED_IN_OUT:
      return {
        ...state,
        response: payload,
      };
    case OPTED_IN_OUT_FAIL:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}
