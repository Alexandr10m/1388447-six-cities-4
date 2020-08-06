import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Login from "../login/login.jsx";
import FavouriteOffers from "../favourite-offers/favourite-offers.jsx";
import FavouriteEmpty from "../favourite-empty/favourite-empty.jsx";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data.js";
import {getFavourite, getLoadFavouriteProgress} from "../../reducer/data/selectors.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants.js";
import Preload from "../preload/preload.jsx";


class FavouritePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavouriteOffers} = this.props;
    loadFavouriteOffers();
  }

  _showPreload() {
    return <Preload/>;
  }

  _showFavourite() {
    const {favouriteOffers} = this.props;
    const isEmptyFavourite = favouriteOffers.length === 0;
    const emptyClass = isEmptyFavourite ? `page--favorites-empty` : ``;

    return (
      <div className={`page ${emptyClass}`}>
        <Login/>
        <main className={`page__main page__main--favorites ${emptyClass}`}>
          <div className="page__favorites-container container">
            {isEmptyFavourite
              ? <FavouriteEmpty/>
              : <FavouriteOffers
                favouriteOffers={favouriteOffers}
              />}
          </div>
        </main>
        <footer className="footer container">
          <Link
            to={AppRoute.ROOT}
            className="footer__logo-link">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      </div>
    );
  }

  render() {
    const {isLoadFavourite} = this.props;

    if (isLoadFavourite) {
      return this._showPreload();
    }

    return this._showFavourite();
  }
}


FavouritePage.propTypes = {
  favouriteOffers: PropTypes.array.isRequired,
  isLoadFavourite: PropTypes.bool.isRequired,
  loadFavouriteOffers: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  favourite: getFavourite(state),
  isLoadFavourite: getLoadFavouriteProgress(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavouriteOffers() {
    dispatch(Operation.loadFavourite());
  }
});


export {FavouritePage};
export default connect(mapStateToProps, mapDispatchToProps)(FavouritePage);
