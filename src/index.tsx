import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app";
import reducer from "./reducer/reducer";
import thunk from "redux-thunk";
import createAPI from "./api";
import {ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducer/user/user";
import {ActionCreator as DataActionCreator} from "./reducer/data/data";


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
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
