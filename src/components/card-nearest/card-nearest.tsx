import * as React from "react";
import Card from "../card/card";
import {Subtract} from "utility-types";


interface InjectingProps {
  className: string;
}

type P = React.ComponentProps<typeof Card>;
type T = Subtract<P, InjectingProps>;

const CardNearest: React.FunctionComponent<T> = (props: T) => {
  const className = `near-places__card`;

  return (
    <Card
      className={className}
      {...props}

    />
  );
};


export default CardNearest;
