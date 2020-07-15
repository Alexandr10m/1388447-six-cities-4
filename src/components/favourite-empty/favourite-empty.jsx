import React from "react";


const FavouriteEmpty = () => {

  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
      </div>
    </section>
  );
};


FavouriteEmpty.propTypes = {};


export default FavouriteEmpty;
