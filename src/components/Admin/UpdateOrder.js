import React, { useEffect, useState } from 'react';
import './UpdateOrder.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails, updateOrder } from '../../redux/Action/OrderAction';
import { UPDATE_ORDER_RESET } from '../../redux/Constants/OrderConstants';
import VerticalTabs from './VerticalTabs';
import AdminHeader from './AdminHeader/AdminHeader';

const UpdateOrder = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Using optional chaining to handle optional properties and errors
    const { order, error: orderError, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const [status, setStatus] = useState('');

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const updatedOrder = {
            status: status,
        };

        dispatch(updateOrder(id, updatedOrder));
    };

    useEffect(() => {
        if (orderError) {
            dispatch(clearErrors());
        }

        if (updateError) {
            dispatch(clearErrors());
        }

        if (isUpdated) {
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        // Fetch order details
        dispatch(getOrderDetails(id));
    }, [dispatch, id, isUpdated, orderError, updateError]);

    return (
        <>
            <AdminHeader title={"Update Order Status"} />
            <div className="update-order-container">
                <VerticalTabs />
                {loading ? (
                    <p>Loading...</p>
                ) : order ? (
                    <div className="order-details">
                        <h3>Order Summary</h3>
                        <hr/>
                        <div>
                            <h4>Shipping Information:</h4>
                            <p>
                                <strong>Full Name:</strong> {order.user?.name}
                            </p>
                            <p>
                                <strong>Address:</strong> {order.shippingInfo?.address}
                            </p>
                            <p>
                                <strong>Phone Number:</strong> {order.shippingInfo?.phoneNumber}
                            </p>
                        </div>

                        <div>
                            <h4>Payment Info</h4>
                            <hr/>
                            <ul style={{
                            color: order.paymentInfo?.status === 'succeeded' ? "green" : "red",
                        }}>
                                {order.paymentInfo?.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                            </ul>
                            <div>
                                <p><strong>Amount : </strong>₹{order.totalPrice}</p>
                                
                            </div>
                        </div>

                        <div>
                            <h3>Order Status</h3>
                            <hr/>
                            <strong>{order.orderStatus}</strong>
                        </div>

                        <h3>Your Cart Items:</h3>
                        <hr/>
                        <div >
                            {order.orderItems?.map((item) => (
                                <div key={item.product} className='cart-order-summary'>
                                    <img src={item.image} alt="Product" />
                                    <p>{item.name}</p>
                                    <p>
                                        {item.quantity} X ₹{item.price} ={' '}
                                        <b>₹{(item.price * item.quantity).toFixed(2)}</b>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            display: order.orderStatus === "Delivered" ? "none" : "block",
                        }}>
                            <h3>Update Order Status</h3>
                            <form onSubmit={updateOrderSubmitHandler} >
                                <div>
                                    <select onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Choose Category</option>
                                        {order.orderStatus === "Processing" && (
                                            <option value="Shipped">Shipped</option>
                                        )}

                                        {order.orderStatus === "Shipped" && (
                                            <option value="Delivered">Delivered</option>
                                        )}
                                    </select>
                                </div>

                                <button type="submit" disabled={!status || loading}>
                                    Update Status
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <p>Order not found.</p>
                )}
            </div></>
    );
};

export default UpdateOrder;
