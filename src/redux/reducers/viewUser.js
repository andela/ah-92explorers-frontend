import {
  VIEW_USER,
  VIEW_USER_ERROR,
  CHECK_FOLLOW,
} from '../actions/actionTypes/viewUser';

const initialState = {
  checkFollower: null,
  viewUser: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case VIEW_USER:
      return {
        ...state,
        loading: false,
        viewUser: payload,
        error: null,
      };
    case CHECK_FOLLOW:
      return {
        ...state,
        loading: false,
        checkFollower: payload,
        error: null,
      };
    case VIEW_USER_ERROR:
      return {
        ...state,
        loading: false,
        viewUser: null,
        error: payload,
      };
    default:
      return state;
  }
}
