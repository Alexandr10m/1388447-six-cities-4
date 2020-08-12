import * as React from "react";
import {connect} from "react-redux";
import {getEmail} from "../../reducer/user/selectors";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants";
import {ActionCreator} from "../../reducer/state/state";


interface Props {
  email: string | undefined;
  onCityClick: (city: string) => void;
}

const Login: React.FunctionComponent<Props> = (props: Props) => {
  const {
    email,
    onCityClick,
  } = props;

  const defaultText = `Sign in`;
  const showText = email || defaultText;

  const handlerCityClick = () => {
    const city = `Amsterdam`;
    onCityClick(city);
  };


  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              onClick={handlerCityClick}
              to={AppRoute.ROOT}
              className="header__logo-link"
            >
              <img className="header__logo" src={`/img/logo.svg`} alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">

                <Link
                  to={AppRoute.FAVOURITE}
                  className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">{showText}</span>
                </Link>

              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  email: getEmail(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => {
    dispatch(ActionCreator.changeCity(city));
  }
});


export {Login};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
