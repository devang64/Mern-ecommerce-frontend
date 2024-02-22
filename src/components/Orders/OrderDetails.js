import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, getOrderDetails } from '../../redux/Action/OrderAction';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import './OrderDetailes.css'
const OrderDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        const paramsId = params.id
        dispatch(getOrderDetails(paramsId));
    }, [dispatch, error]);
    return (
        <>
            {loading ? <Loader /> : (<>
                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <h4>Order #{order && order._id}</h4>
                    </div>
                    <div className="orderDetails">
                        <h5>Shipping Info</h5>

                        <div className="order">
                            <div>
                                <p>Name:</p>
                                {order.user && order.user.name}
                            </div>
                            <div>
                                <p>Phone:</p>
                                {order.shippingInfo && order.shippingInfo.phoneNumber}
                            </div>
                            <div>
                                <p>Address:</p>
                                {order.shippingInfo &&
                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}
                            </div>
                        </div>
                    </div>
                    <div className="orderDetails">
                        <h5>Payment Info</h5>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.paymentInfo &&
                                            order.paymentInfo.status === "succeeded"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order.paymentInfo &&
                                        order.paymentInfo.status === "succeeded"
                                        ? "PAID"
                                        : "NOT PAID"}
                                </p>
                            </div>
                            <div>
                                <p>Amount:</p>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                    <div className="orderDetails">
                        <h5>Order Status</h5>
                        <p
                            className={
                                order.orderStatus && order.orderStatus === "Delivered"
                                    ? "greenColor"
                                    : "redColor"
                            }
                        >
                            {order.orderStatus && order.orderStatus}
                        </p>
                    </div>
                    <div className="orderDetails">
                        <h5>Order Item:</h5>
                        <div className="orderDetailsCartItemsContainer">
                            {order.orderItems &&
                                order.orderItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X ₹{item.price} ={" "}
                                            <b>₹{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

            </>)}
        </>
    )
}

export default OrderDetails