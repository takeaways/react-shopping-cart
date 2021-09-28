import React, { useState } from "react";
import { useQuery } from "react-query";
import produce from "immer";

import Item from "src/Item/Item";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import { Wrapper, StyledButton } from "src/App.styles";
import Cart from "./Cart/Cart";

export type CartItem = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItem[]> => {
  return (await fetch(`https://fakestoreapi.com/products`)).json();
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { data, isLoading, error } = useQuery<CartItem[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: CartItem[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddToCard = (clickedItem: CartItem) => {
    setCartItems((prev) => {
      return produce(prev, (draft) => {
        // 1. is the item already added in the cart?
        const existCartItemIndex = prev.findIndex(
          (item) => item.id === clickedItem.id
        );
        if (existCartItemIndex > -1) {
          draft[existCartItemIndex].amount += 1;
          return;
        }
        // First time the item is added
        draft.push({ ...clickedItem, amount: 1 });
        console.log(draft);
      });
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      produce(prev, (draft) => {
        const decreaseTargetItem = draft.find((item) => item.id === id);
        if (!decreaseTargetItem) return;

        const decreasedAmount = decreaseTargetItem.amount - 1;
        if (decreasedAmount === 0) {
          draft.splice(
            draft.findIndex((item) => item.id === id),
            1
          );
          return;
        }
        decreaseTargetItem.amount -= 1;
      })
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong....</div>;

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => {
          setCartOpen(false);
        }}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCard}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCard={handleAddToCard} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
