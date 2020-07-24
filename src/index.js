import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import thunk from "redux-thunk";
import createAPI from "./api.js";
import {ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";


const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f;

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

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
