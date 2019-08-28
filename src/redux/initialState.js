const initialState = {
  isAuthenticated: false,
  user: {},
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
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
  article: {},
  feed: [],
  loading: null,
  comment: '',
  commentError: null,
  comments: [],
  isCommentDelete: false,
};

export default initialState;
