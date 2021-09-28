import React from "react";

import Button from "@material-ui/core/Button";
import { CartItem as CartItemType } from "../App";

import { Wrapper } from "./CartItem.styles";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

function CartItem({ item, addToCart, removeFromCart }: Props) {
  const { title, id, price, amount, image } = item;
  return (
    <Wrapper>
      <div>
        <h3>{title}</h3>
        <div className="information">
          <p>Price: ${price}</p>
          <p>Total: ${(amount * price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(id)}
          >
            -
          </Button>
          <p>{amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>

      <img src={image} alt={title} />
    </Wrapper>
  );
}

export default CartItem;
