const initialState = {
  isAuthenticated: false,
  user: {},
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  article: {
    rating: {
      rating: [],
    },
  },
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
  comment: '',
  commentError: null,
  comments: [],
  isCommentDelete: false,
  rating: {},
  bookmarks: {},
};

export default initialState;
