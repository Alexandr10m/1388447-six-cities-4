import React from "react";
import PropTypes from "prop-types";
import Login from "../login/login.js";
import {connect} from "react-redux";
import {getCity} from "../../reducer/state/selector.js";
import {Operation} from "../../reducer/user/user.js";
import {Link} from "react-router-dom";


const SignIn = (props) => {
  const {city, onLogin, login, password, loginError, passwordError, disableButton, onSubmit} = props;

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


SignIn.propTypes = {
  city: PropTypes.string.isRequired,
  onLogin: PropTypes.func.isRequired,
  login: PropTypes.node.isRequired,
  password: PropTypes.node.isRequired,
  loginError: PropTypes.node.isRequired,
  passwordError: PropTypes.node.isRequired,
  disableButton: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
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
