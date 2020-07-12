import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getEmail} from "../../reducer/user/selecors";


const Login = (props) => {
  const {email} = props;
  const defaultText = `Sign in`;
  const showText = email || defaultText;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="main.html">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">{showText}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};


Login.propTypes = {
  email: PropTypes.string,
};

const mapStateToProps = (state) => ({
  email: getEmail(state),
});


export {Login};
export default connect(mapStateToProps)(Login);
