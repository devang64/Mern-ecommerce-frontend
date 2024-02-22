import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../Constants/CartConstants";

export const cartReducer = (state = { cartItems: [], totalQuantity: 0 }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x.product === item.product);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existingItem.product ? item : x
          ),
          totalQuantity: state.totalQuantity + item.quantity,
        };
       
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          totalQuantity: state.totalQuantity + item.quantity,
        };

      }
    case REMOVE_FROM_CART:
      const removedItem = state.cartItems.find((x) => x.product === action.payload);
      if (removedItem) {
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.product !== action.payload),
          totalQuantity: state.totalQuantity - removedItem.quantity,
        };
      }
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload
      };

    default:
      return state;
  }
}