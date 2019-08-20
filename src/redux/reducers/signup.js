import initialState from '../initialState';
import { SUBMITTING_CREDENTIALS, SIGN_UP_FAILURE, SIGN_UP_SUCCESS } from '../actions/actionTypes';


const signup = (state = initialState, action) => {
  switch (action.type) {
    case SUBMITTING_CREDENTIALS:
      return {
        ...state,
        userSignup: {
          signUpSubmitting: action.payload,
        },
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        userSignup: {
          signUpSuccess: action.payload,
        },
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        userSignup: {
          signUpFailure: action.payload,
        },
      };
    default:
      return initialState;
  }
};

export default signup;
