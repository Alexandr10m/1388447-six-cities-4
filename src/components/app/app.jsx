import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";


class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showedOffer: null,
    };
    this.handlerCardTitleClick = this.handlerCardTitleClick.bind(this);
  }

  handlerCardTitleClick(offer) {
    this.setState({showedOffer: offer});
  }

  _renderMainPage() {
    if (this.state.showedOffer) {
      return (
        <OfferPage
          offer={this.state.showedOffer}
          offers={this.props.offers}
        />);
    } else {
      return (
        <Main
          offers={this.props.offers}
          onCardTitleClick={this.handlerCardTitleClick}
        />);
    }
  }

  render() {
    const {offers} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainPage()}
          </Route>
          <Route exact path="/offer">
            <OfferPage
              offer={offers[0]}
              offers={this.props.offers}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
};


export default App;
