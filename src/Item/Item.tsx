import React from "react";

import Button from "@material-ui/core/Button";

import { CartItem } from "../App";
import { Wrapper } from "./Item.styles";

type Props = {
  item: CartItem;
  handleAddToCard: (clickedItem: CartItem) => void;
};

function Item({ item, handleAddToCard }: Props) {
  const { image, title, description, price } = item;

  return (
    <Wrapper>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <h3>${price}</h3>
      </div>
      <Button onClick={() => handleAddToCard(item)}>Add to cart</Button>
    </Wrapper>
  );
}

export default Item;
