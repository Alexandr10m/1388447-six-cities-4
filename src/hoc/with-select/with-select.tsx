import * as React from "react";


const withSelect = (Component) => {
  class WithSelect extends PureComponent {
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

  WithSelect.propTypes = {};

  return WithSelect;
};


export default withSelect;
