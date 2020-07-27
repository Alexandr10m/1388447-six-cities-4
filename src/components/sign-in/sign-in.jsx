import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import Login from "../login/login.jsx";
import {connect} from "react-redux";
import {getCity} from "../../reducer/state/selector.js";
import {Operation} from "../../reducer/user/user.js";
import {Link} from "react-router-dom";


class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.loginRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {login} = this.props;
    evt.preventDefault();

    login({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {city} = this.props;
    return (
      <div className="page page--gray page--login">
        <Login/>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form onSubmit={this.handleSubmit} className="login__form form" action="#" method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input ref={this.loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required=""/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input ref={this.passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required=""/>
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
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
  }
}


SignIn.propTypes = {
  city: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  city: getCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(Operation.login(authData));
  },
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
