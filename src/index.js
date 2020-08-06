import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import thunk from "redux-thunk";
import createAPI from "./api.js";
import {ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import {ActionCreator as DataActionCreator} from "./reducer/data/data.js";


const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f;

const handlerNetworkErorr = {
  onUnauthorized() {
    store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  },

  onNetworkError(errorText) {
    store.dispatch(DataActionCreator.changeErrorText(errorText));
    store.dispatch(DataActionCreator.showError(true));
  }
};

const api = createAPI(handlerNetworkErorr);

const store = createStore(reducer, compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    reduxDevTools
));

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
