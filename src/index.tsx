import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Sentry from "@sentry/react";
import {Integrations} from "@sentry/tracing";
import Fallback from "./components/fallback/fallback";

import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app";
import reducer from "./reducer/reducer";
import thunk from "redux-thunk";
import createAPI from "./api";
import {ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducer/user/user";
import {ActionCreator as DataActionCreator} from "./reducer/data/data";


Sentry.init({
  dsn: "https://a689f060299e4e5384ff24908dfc117c@o523953.ingest.sentry.io/5636363",
  integrations: [new Integrations.BrowserTracing()],
  release: "six-cities@" + process.env.npm_package_version,
  tracesSampleRate: 1.0,
});

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
      <Sentry.ErrorBoundary fallback={Fallback} showDialog>
        <App/>
      </Sentry.ErrorBoundary>
    </Provider>,
    document.querySelector(`#root`)
);
