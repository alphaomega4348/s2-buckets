import React from "react";

// Initial State
export const initialState = {
  basket: [],
  history: [],
};

// Selector Function to Get Total Price
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

// Reducer Function
const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      const newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Cannot remove item (id: ${action.id}) — not found in basket.`);
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "ADD_TO_HISTORY":
      return {
        ...state,
        history: [...state.history, ...action.items],
      };

    case "CLEAR_BASKET":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default Reducer;