import * as React from "react";
import FavouriteLocationItem from "../favourite-location-item/favourite-location-item";
import {Link} from "react-router-dom";
import {LocalOffer} from "../../types";


interface Props {
  city: string;
  localOffers: LocalOffer[];
}

const FavouriteLocation: React.FunctionComponent<Props> = (props: Props) => {
  const {city, localOffers} = props;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            to={`/${city}`}
            className="locations__item-link">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {localOffers.map((it) => {
          return (
            <FavouriteLocationItem
              offer={it}
              key={it.id}
            />
          );
        })}
      </div>
    </li>
  );
};


export default FavouriteLocation;
