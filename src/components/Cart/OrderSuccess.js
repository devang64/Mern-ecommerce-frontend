import React from "react";
import "./orderSuccess.css";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <i class="fa fa-check-circle"></i>
            <h3>Your Order has been Placed successfully </h3>
            <Link to="/orders" className="btn btn-light">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;