import React from "react";
import Card from "../card/card.jsx";


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
