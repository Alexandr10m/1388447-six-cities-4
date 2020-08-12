import * as React from "react";
import {Subtract} from "utility-types";


interface State {
  isShowOptions: boolean;
}

interface InjectedProps {
  isShowOptions: boolean;
  onToggleViewOptions: () => void;
  onHideOptions: () => void;
}

const withSelect = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithSelect extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isShowOptions: false,
      };

      this.handleToggelViewOptions = this.handleToggelViewOptions.bind(this);
      this.handleHideOptions = this.handleHideOptions.bind(this);
    }

    handleToggelViewOptions() {
      this.setState((state) => ({isShowOptions: !state.isShowOptions}));
    }

    handleHideOptions() {
      this.setState({isShowOptions: false});
    }

    render() {
      return (
        <Component
          isShowOptions={this.state.isShowOptions}
          onToggleViewOptions={this.handleToggelViewOptions}
          onHideOptions={this.handleHideOptions}
        />
      );
    }
  }

  return WithSelect;
};


export default withSelect;
