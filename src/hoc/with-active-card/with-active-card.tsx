import * as React from "react";


const withActiveCard = (Component) => {
  class WithActiveCard extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeCard: null,
      };
      this._hanlerCardMouseEnter = this._hanlerCardMouseEnter.bind(this);
    }

    _hanlerCardMouseEnter(offer) {
      this.setState({activeCard: offer});
    }

    render() {
      return (
        <Component
          {...this.props}
          onActiveCard={this._hanlerCardMouseEnter}
          activeCard={this.state.activeCard}
        />
      );
    }
  }


  WithActiveCard.propTypes = {};


  return WithActiveCard;
};


export default withActiveCard;
