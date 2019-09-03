const initialState = {
  article: {},
  feed: [],
  loading: null,
  userSignup: {
    signUpSubmitting: '',
    signUpSuccess: '',
    signUpfailure: '',
  },
  home: '',
  profile: '',
  login: {
    user: {},
  },
  userResetPsw: {
    emailSubmitting: '',
    submittedSuccess: '',
    submittedFailure: '',
  },
  resettingPsw: {
    passwordSubmitting: '',
    resetSuccess: '',
    resetFailure: '',
  },
};

export default initialState;
