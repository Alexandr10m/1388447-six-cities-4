import {extend} from "../../utils.js";
import {authInfoAdapter} from "../../adapter.js";


const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {},
  comment: {},
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  CHANGE_AUTH_INFO: `CHANGE_AUTH_INFO`,
  СHANGE_COMMENT: `СHANGE_COMMENT`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),

  changeAuthInfo: (authData) => ({
    type: ActionType.CHANGE_AUTH_INFO,
    payload: authData,
  }),

  changeComment: (dataComment) => ({
    type: ActionType.СHANGE_COMMENT,
    payload: dataComment,
  }),

};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.changeAuthInfo(authInfoAdapter(response.data)));
      });
  },

  sendComment: (commentData, hotelId) => (dispatch, getState, api) => {
    return api.post(`/comments/${hotelId}`, {
      comment: commentData.comment,
      rating: commentData.rating,
    })
      .then((response) => {
        dispatch(ActionCreator.changeComment(response.data));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) =>{
        throw err;
      });
  },

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.CHANGE_AUTH_INFO:
      return extend(state, {
        authInfo: action.payload,
      });
  }

  return state;
};


export {AuthorizationStatus, ActionType, ActionCreator, reducer, Operation};
