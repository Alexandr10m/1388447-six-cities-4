import React from "react";
import PropTypes from "prop-types";
import Login from "../login/login.jsx";
import FavouriteOffers from "../favourite-offers/favourite-offers.jsx";
import FavouriteEmpty from "../favourite-empty/favourite-empty.jsx";


const FavouritePage = (props) => {
  const {favouriteOffers} = props;
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
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};


FavouritePage.propTypes = {
  favouriteOffers: PropTypes.array.isRequired,
};


export default FavouritePage;
