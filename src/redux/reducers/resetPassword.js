import initialState from '../initialState';
import { EMAIL_SUBMIT, SUBMIT_FAILURE, SUBMIT_SUCCESS } from '../actions/actionTypes';


const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_SUBMIT:
      return {
        ...state,
        userResetPsw: {
          emailSubmitting: action.payload,
        },
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        userResetPsw: {
          submittedSuccess: action.payload,
        },
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        userResetPsw: {
          submittedFailure: action.payload,
        },
      };
    default:
      return initialState;
  }
};

export default resetPassword;
