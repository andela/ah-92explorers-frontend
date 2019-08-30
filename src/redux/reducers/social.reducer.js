import { socialTypes } from '../actions/actionTypes';

export const social = (state = {}, action) => {
  switch (action.type) {
    case socialTypes.LOGIN_SUCCESS:
      return {
        user: action.user,
        success: true,
      };
    case socialTypes.LOGIN_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};
