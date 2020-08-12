import * as React from "react";
import PropTypes from "prop-types";

const Host = (props) => {
  const {description, host} = props;
  const {name, isPro, avatarUrl} = host;
  const proClass = isPro && `property__avatar-wrapper--pro`;

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={`property__avatar-wrapper ${proClass} user__avatar-wrapper`}>
          <img className="property__avatar user__avatar" src={`/${avatarUrl}`} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="property__user-name">
          {name}
        </span>
      </div>
      <div className="property__description">
        <p className="property__text">
          {description}
        </p>
      </div>
    </div>
  );
};

Host.propTypes = {
  description: PropTypes.string.isRequired,
  host: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
};


export default Host;
