import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import LeafLet from "leaflet";


class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._cityZoom = this.props.cityZoom;
    this._offerZoom = this.props.locationZoom;
    this._icon = null;
    this._activeIcon = null;
    this._map = null;
    this._markers = null;
  }

  _initMap() {
    const {cityCoords} = this.props;

    this._icon = LeafLet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [this._offerZoom, this._offerZoom]
    });

    this._activeIcon = LeafLet.icon({
      iconUrl: `/img/pin-active.svg`,
      iconSize: [this._offerZoom, this._offerZoom]
    });

    this._map = LeafLet.map(`map`, {
      center: cityCoords,
      zoom: this._cityZoom,
      zoomControl: false,
      marker: true,
      layers: [],
    });

    this._map.setView(cityCoords, this._cityZoom);

    this.layerGroup = LeafLet.layerGroup();

    this._layer = LeafLet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);

    this._addMarkers();
  }

  _addMarkers() {
    const {localOffers, activeCard} = this.props;

    this.layerGroup = LeafLet.layerGroup().addTo(this._map);

    localOffers.map((offer) => {
      if (activeCard) {
        if (offer.id === activeCard.id) {
          LeafLet.marker(offer.coords, {icon: this._activeIcon})
            .addTo(this.layerGroup);
        } else {
          LeafLet.marker(offer.coords, {icon: this._icon})
            .addTo(this.layerGroup);
        }
      } else {
        LeafLet.marker(offer.coords, {icon: this._icon})
            .addTo(this.layerGroup);
      }

    });
  }

  _updateMarkers() {
    this.layerGroup.remove();
    this._addMarkers();
  }

  _updateMap() {
    this.layerGroup.remove();
    this._map.remove();
    this._initMap();
  }

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cityCoords !== this.props.cityCoords) {
      this._updateMap();
      return;
    }

    if (prevProps.activeCard !== this.props.activeCard) {
      this._updateMarkers();
      return;
    }
  }

  componentWillUnmount() {
    this._map = null;
  }

  render() {
    return <div id="map" style={{width: `100%`, height: `100%`}}></div>;
  }
}


Map.propTypes = {
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
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityZoom: PropTypes.number.isRequired,
  locationZoom: PropTypes.number.isRequired,
  activeCard: PropTypes.shape({
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
  }),
};

export default Map;
