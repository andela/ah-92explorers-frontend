import initialState from '../initialState';
import { PASSWORD_RESET, RESET_FAILURE, RESET_SUCCESS } from '../actions/actionTypes';


const resettingPassword = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET:
      return {
        ...state,
        resettingPsw: {
          passwordSubmitting: action.payload,
        },
      };
    case RESET_SUCCESS:
      return {
        ...state,
        resettingPsw: {
          resetSuccess: action.payload,
        },
      };
    case RESET_FAILURE:
      return {
        ...state,
        resettingPsw: {
          resetFailure: action.payload,
        },
      };
    default:
      return initialState;
  }
};

export default resettingPassword;
