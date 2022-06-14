import { createContext } from "react";

export const CartContext = createContext({
  cart: [] as Number[],
  setCart: (x: any)=>{}
})