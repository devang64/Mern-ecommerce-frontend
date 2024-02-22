import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductDetailesReducer, ProductModifyReducer, ProductReducer, newProductReducer, newReviewReducer, productReviewsReducer, reviewReducer } from "./Reducer/ProductReducer";
import {ForgotPasswordReducer, ProfileReducer, allUsersReducer, userDetailsReducer, userReducer} from "./Reducer/UserReducer";
import { cartReducer } from "./Reducer/CartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./Reducer/OrderReducer";

const reducer = combineReducers({
    products : ProductReducer,
    productDetails : ProductDetailesReducer,
    user: userReducer,
    profile : ProfileReducer,
    forgotPassword  : ForgotPasswordReducer,
    cart : cartReducer,
    newReview : newReviewReducer,
    newProduct : newProductReducer,
    productModify : ProductModifyReducer,
    newOrder : newOrderReducer,
    myOrder : myOrdersReducer,
    allOrders : allOrdersReducer,
    orderDetails : orderDetailsReducer,
    order : orderReducer,
    allUsers : allUsersReducer,
    userDetails : userDetailsReducer,
    productReviews : productReviewsReducer,
    review : reviewReducer

});

let initialState = {
    cart : {
        cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;