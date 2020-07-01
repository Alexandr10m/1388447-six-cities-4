import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import LeafLet from "leaflet";


class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._zoom = 12;
    this._icon = null;
    this._map = null;
    this._markers = null;
  }

  _initMap() {
    const {city} = this.props;

    this._icon = LeafLet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    this._map = LeafLet.map(`map`, {
      center: city,
      zoom: this._zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView(city, this._zoom);

    LeafLet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);

    this._addMarkers();
  }

  _addMarkers() {
    const {localOffers} = this.props;

    this._markers = LeafLet.layerGroup().addTo(this._map);

    localOffers.map((offer) => {
      LeafLet.marker(offer.coords, this._icon)
      .addTo(this._map);
    });
  }

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate(prevProps) {

    if (prevProps.city === this.props.city) {
      return;
    }

    const {city} = this.props;

    this._markers.clearLayers();
    this._map.setView(city, this._zoom);

    this._addMarkers();
  }

  render() {
    return <div ref={this._mapRef} id="map" style={{width: `100%`, height: `100%`}}></div>;
  }

  componentWillUnmount() {
    this._map.remove();
  }
}


Map.propTypes = {
  localOffers: PropTypes.arrayOf(PropTypes.shape({
    isPremium: PropTypes.bool.isRequired,
    pictures: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    grade: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    coords: PropTypes.array.isRequired,
  })),
  city: PropTypes.array.isRequired,
};

export default Map;
