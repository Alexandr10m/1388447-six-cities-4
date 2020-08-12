import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";


type Props = RouteProps & {
  render: () => React.ReactNode;
  authorizationStatus: string;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {
    render,
    path,
    exact,
    authorizationStatus,
  } = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render() : <Redirect to={`/login`}/>
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
