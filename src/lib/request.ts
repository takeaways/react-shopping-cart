import { CartItem } from "../types/cart";

export const getProducts = async (): Promise<CartItem[]> => {
  return (await fetch(`https://fakestoreapi.com/products`)).json();
};
