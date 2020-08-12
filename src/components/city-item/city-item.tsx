import * as React from "react";
import {Link} from "react-router-dom";

interface Props {
  city: string;
  currentCity: string | undefined;
  onCityClick: (evt: any) => void;
}


const CityItem: React.FunctionComponent<Props> = (props: Props) => {
  const {
    city,
    currentCity = `Paris`,
    onCityClick,
  } = props;

  const activeClass = city === currentCity ? `tabs__item--active` : ``;

  return (
    <li onClick={onCityClick} className="locations__item">
      <Link
        to={`/${city}`}
        className={`locations__item-link tabs__item ${activeClass}`}>
        <span>{city}</span>
      </Link>
    </li>
  );
};


export default CityItem;
