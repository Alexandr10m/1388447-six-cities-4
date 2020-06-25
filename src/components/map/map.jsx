import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import LeafLet from "leaflet";

class Map extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const {offers} = this.props;
    const city = [52.38333, 4.9];
    const icon = LeafLet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
    const zoom = 12;
    const map = LeafLet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    LeafLet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(map);

    const offerCords = [52.3709553943508, 4.89309666406198];
    LeafLet.marker(offerCords, {icon})
      .addTo(map);

    // offers.map((offer) => {
    //   LeafLet.marker(offer.coords, {icon})
    //   .addTo(map);
    // });
  }

  render() {
    return <div id="map"></div>;
  }
}


Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    isPremium: PropTypes.bool.isRequired,
    pictures: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    grade: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    coords: PropTypes.array.isRequired,
  })),
};

export default Map;
