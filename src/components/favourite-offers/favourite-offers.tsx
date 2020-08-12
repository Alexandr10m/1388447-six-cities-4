import * as React from "react";
import FavouriteLocation from "../favourite-location/favourite-location";
import {CityOffers} from "../../types";


interface Props {
  favouriteOffers: CityOffers[];
}

const FavouriteOffers: React.FunctionComponent<Props> = (props: Props) => {
  const {favouriteOffers} = props;
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favouriteOffers.map((it, i) => {
          const {city, localOffers} = it;
          return (
            <FavouriteLocation
              key={`${city}-${i}`}
              city={city}
              localOffers={localOffers}
            />
          );
        })}
      </ul>
    </section>
  );
};


export default FavouriteOffers;

