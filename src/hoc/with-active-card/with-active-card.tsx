import * as React from "react";
import {Subtract} from "utility-types";
import {LocalOffer} from "../../types";


interface State {
  activeCard: LocalOffer | null;
}

interface InjectingProps {
  activeCard: LocalOffer | null;
  onActiveCard: (offer: LocalOffer) => void;
}

const withActiveCard = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveCard extends React.PureComponent<T, State> {
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

  return WithActiveCard;
};


export default withActiveCard;
