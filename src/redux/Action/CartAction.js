import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../Constants/CartConstants";
import axios from "axios";
const BACKEND_URL = "https://mern-ecommerce-backend-mu.vercel.app"
// const BACKEND_URL = "http://localhost:5000"
export const addToCart = (id, quantity) => async (dispatch, getstate) => {
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/product/${id}`);
    console.log(data)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            category: data.product.category,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))
};

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: productId,
    })
};
export const saveShippingInfo = (data) => (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    })
    localStorage.setItem("shippingInfo", JSON.stringify(data));
};