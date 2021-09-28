import React from "react";

import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItem as CartItemType } from "src/App";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

function Cart({ cartItems, addToCart, removeFromCart }: Props) {
  return (
    <Wrapper>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in carts.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </Wrapper>
  );
}

export default Cart;
