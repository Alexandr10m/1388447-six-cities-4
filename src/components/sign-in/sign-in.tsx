import * as React from "react";
import Login from "../login/login";
import {connect} from "react-redux";
import {getCity} from "../../reducer/state/selector";
import {Operation} from "../../reducer/user/user";
import {Link} from "react-router-dom";


interface Props {
  city: string;
  login: React.ReactNode;
  password: React.ReactNode;
  loginError: React.ReactNode;
  passwordError: React.ReactNode;
  disableButton: boolean;
  onLogin: () => void;
  onSubmit: (onLogin: () => void) => void;
}

const SignIn: React.FunctionComponent<Props> = (props: Props) => {
  const {city,
    login,
    password,
    loginError,
    passwordError,
    disableButton,
    onLogin,
    onSubmit,
  } = props;

  const _handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit(onLogin);
  };

  return (
    <div className="page page--gray page--login">
      <Login/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={_handleSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                {login}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                {password}
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={disableButton}
              >
                    Sign in
              </button>
              {loginError}
              {passwordError}
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to={`/${city}`}
                className="locations__item-link">
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  city: getCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogin(authData) {
    dispatch(Operation.login(authData));
  },
});


export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
