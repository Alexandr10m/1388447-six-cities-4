import * as React from "react";
import PropTypes from "prop-types";
import Login from "../login/login.jsx";
import FavouriteOffers from "../favourite-offers/favourite-offers.js";
import FavouriteEmpty from "../favourite-empty/favourite-empty.js";
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
  favouriteOffers: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
    cityCoords: PropTypes.arrayOf(PropTypes.number),
    cityZoom: PropTypes.number,
    localOffers: PropTypes.arrayOf(PropTypes.shape({
      isPremium: PropTypes.bool.isRequired,
      pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      isFavourite: PropTypes.bool.isRequired,
      grade: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      bedroom: PropTypes.number.isRequired,
      maxAdults: PropTypes.number.isRequired,
      facilities: PropTypes.arrayOf(PropTypes.string).isRequired,
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      locationZoom: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      host: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        isPro: PropTypes.bool.isRequired,
        avatarUrl: PropTypes.string.isRequired,
      }).isRequired,
    })),
  })),
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
