import * as React from "react";
import * as LeafLet from "leaflet";
import {LocalOffer} from "../../types";

interface Props {
  localOffers: LocalOffer[];
  cityCoords: number[];
  cityZoom: number;
  locationZoom: number;
  activeCard: LocalOffer;
}

class Map extends React.PureComponent<Props> {
  private _cityZoom: number;
  private _offerZoom: number;
  private _icon: string | null;
  private _activeIcon: string | null;
  private _map: any;
  private layerGroup: any;

  constructor(props) {
    super(props);

    this._cityZoom = this.props.cityZoom;
    this._offerZoom = this.props.locationZoom;
    this._icon = null;
    this._activeIcon = null;
    this._map = null;
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

    // this._layer = LeafLet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
    //   attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    // })
    // .addTo(this._map);
    LeafLet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
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

  render() {
    return <div id="map" style={{width: `100%`, height: `100%`}}></div>;
  }
}


export default Map;
