import * as React from "react";


const MIN_LENGTH_PASSWORD = 4;
const checkLogin = (login) => {
  const isCorrectLogin = login.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  return !!isCorrectLogin;
};

const withSignIn = (Component) => {
  class WithSignIn extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        login: ``,
        password: ``,
        isValidLogin: true,
        isValidPassword: true,
        disableButton: false,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleUserLoginEnter = this.handleUserLoginEnter.bind(this);
      this.handleUsetPasswordEnter = this.handleUsetPasswordEnter.bind(this);
    }

    handleUserLoginEnter(evt) {
      const {value} = evt.target;
      this.setState({login: value}, this._validateForm);
    }

    handleUsetPasswordEnter(evt) {
      const {value} = evt.target;
      this.setState({password: value}, this._validateForm);
    }

    handleSubmit(onLogin) {

      if (!this._validateForm()) {
        return;
      }

      onLogin({
        login: this.state.login,
        password: this.state.password,
      });
    }

    _disableButton(bool) {
      this.setState({disableButton: bool});
    }

    _resetForm() {
      this.setState({
        login: ``,
        password: ``,
      });
    }

    _validateForm() {
      const isCorrectLogin = checkLogin(this.state.login);
      const isCorrectPassword = this.state.password.length >= MIN_LENGTH_PASSWORD;

      this.setState({
        isValidLogin: isCorrectLogin,
        isValidPassword: isCorrectPassword,
      });

      if (!isCorrectLogin || !isCorrectPassword) {
        this._disableButton(true);
      }
      if (isCorrectLogin && isCorrectPassword) {
        this._disableButton(false);
      }

      return isCorrectLogin && isCorrectPassword;
    }

    _createInputLogin() {
      return (
        <input
          onChange={this.handleUserLoginEnter}
          value={this.state.login}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      );
    }

    _createInputPassword() {
      return (
        <input
          onChange={this.handleUsetPasswordEnter}
          value={this.state.password}
          minLength={MIN_LENGTH_PASSWORD}
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      );
    }

    _createLoginErrorMarkup() {
      return !this.state.isValidLogin && <div style={{color: `red`}}> You need to enter correct email</div>;
    }

    _createPasswordErrorMarkup() {
      return !this.state.isValidPassword && <div style={{color: `red`}}> You need to enter at least 4 characters</div>;
    }

    render() {
      return (
        <Component
          {...this.props}
          login={this._createInputLogin()}
          password={this._createInputPassword()}
          loginError={this._createLoginErrorMarkup()}
          passwordError={this._createPasswordErrorMarkup()}
          disableButton={this.state.disableButton}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  WithSignIn.propTypes = {};

  return WithSignIn;
};


export default withSignIn;
