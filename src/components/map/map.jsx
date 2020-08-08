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
    const {city} = this.props;

    this._icon = LeafLet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [this._offerZoom, this._offerZoom]
    });

    this._activeIcon = LeafLet.icon({
      iconUrl: `/img/pin-active.svg`,
      iconSize: [this._offerZoom, this._offerZoom]
    });

    this._map = LeafLet.map(`map`, {
      center: city,
      zoom: this._cityZoom,
      zoomControl: false,
      marker: true,
      layers: [],
    });

    this._map.setView(city, this._cityZoom);

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
    if (prevProps.city !== this.props.city) {
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
  localOffers: PropTypes.array.isRequired,
  city: PropTypes.array.isRequired,
  cityZoom: PropTypes.number.isRequired,
  locationZoom: PropTypes.number.isRequired,
  activeCard: PropTypes.object,
};

export default Map;
