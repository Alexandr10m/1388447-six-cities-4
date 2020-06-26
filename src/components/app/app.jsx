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
    const {offers} = this.props;
    if (this.state.showedOffer) {
      return (
        <OfferPage
          offer={this.state.showedOffer}
          offers={offers}
          onCardTitleClick={this.handlerCardTitleClick}
        />);
    } else {
      return (
        <Main
          offers={offers}
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
              offers={offers}
              onCardTitleClick={this.handlerCardTitleClick}
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
