import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import LeafLet from "leaflet";
import {connect} from "react-redux";
import {getIndicatedCard} from "../../reducer/state/selector.js";


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
      iconUrl: `img/pin.svg`,
      iconSize: [this._offerZoom, this._offerZoom]
    });

    this._activeIcon = LeafLet.icon({
      iconUrl: `img/pin-active.svg`,
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
    const {localOffers, indicatedCard} = this.props;

    this.layerGroup = LeafLet.layerGroup().addTo(this._map);

    localOffers.map((offer) => {
      if (indicatedCard) {
        if (offer.id === indicatedCard.id) {
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

    if (prevProps.indicatedCard !== this.props.indicatedCard) {
      this._updateMarkers();
      return;
    }
  }

  render() {
    return <div id="map" style={{width: `100%`, height: `100%`}}></div>;
  }

  componentWillUnmount() {
    this._map = null;
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
  cityZoom: PropTypes.number.isRequired,
  locationZoom: PropTypes.number.isRequired,
  indicatedCard: PropTypes.shape({
    isPremium: PropTypes.bool.isRequired,
    pictures: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    grade: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    coords: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
  }),
};


const mapStateToProps = (state) => ({
  indicatedCard: getIndicatedCard(state),
});


export {Map};
export default connect(mapStateToProps, null)(Map);
