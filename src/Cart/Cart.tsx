import React, { useMemo } from "react";

import CartItem from "src/CartItem/CartItem";

import { CartItem as CartItemType } from "src/types/cart";

import { Wrapper } from "./Cart.styles";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

function Cart({ cartItems, addToCart, removeFromCart }: Props) {
  const calculateTotalPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.amount * item.price, 0),
    [cartItems]
  );

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
      <h2>Total: ${calculateTotalPrice.toFixed(2)}</h2>
    </Wrapper>
  );
}

export default React.memo(Cart);
