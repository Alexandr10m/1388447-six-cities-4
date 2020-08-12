import * as React from "react";
import PropTypes from "prop-types";
import {getTextError} from "../../reducer/data/selectors";
import {connect} from "react-redux";


const NetworkError = (props) => {
  const {textError} = props;
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index page__main--index-empty">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">{textError}</b>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

NetworkError.propTypes = {
  textError: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  textError: getTextError(state),
});


export {NetworkError};
export default connect(mapStateToProps)(NetworkError);

