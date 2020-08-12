import * as React from "react";
import Card from "../card/card.js";


const CardNearest = (props) => {
  const className = `near-places__card`;

  return (
    <Card
      className={className}
      {...props}

    />
  );
};

Card.propTypes = {};


export default CardNearest;
