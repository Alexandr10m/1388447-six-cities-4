import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {reducer, Operation} from "./reducer.js";
import thunk from "redux-thunk";
import createAPI from "./api.js";


const api = createAPI();

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f;

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        reduxDevTools
    )
);

store.dispatch(Operation.loadOffers())
  .then(() => {
    ReactDOM.render(
        <Provider store={store}>
          <App/>
        </Provider>,
        document.querySelector(`#root`)
    );
  });
