import * as React from "react";
import CityItem from "../city-item/city-item";


interface Props {
  cities: string[];
  currentCity: string;
  onCityClick: (city: string) => void;
}

const ListCities: React.FunctionComponent<Props> = (props: Props) => {
  const {
    cities,
    currentCity,
    onCityClick,
  } = props;

  const handlerCityClick = (evt) => {

    const city = evt.target.textContent;
    onCityClick(city);
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, i) => <CityItem
        key={`${city}-${i}`}
        city={city}
        currentCity={currentCity}
        onCityClick={handlerCityClick}
      />)}
    </ul>
  );
};


export default ListCities;
