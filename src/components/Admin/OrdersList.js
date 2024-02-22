import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
  updateOrder,

} from '../../redux/Action/OrderAction';
import './OrderList.css';
import VerticalTabs from './VerticalTabs';
import { toast } from 'react-toastify';
import { DELETE_ORDER_RESET } from '../../redux/Constants/OrderConstants';
import AdminHeader from './AdminHeader/AdminHeader';
const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
    console.log(orders)
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const deleteOrderHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(id));
    }
  };
  const updateOrderHandler = (id) => {
    // Implement the logic to update the order, e.g., navigate to an update order page.
  };

  return (
    <>
    <AdminHeader title={"Orders"}/>
    <div className="order-list">
      <VerticalTabs />
      <div className="order-list-container">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="order-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Total Items</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.orderItems.length}</td>
                  <td>${order.totalPrice}</td>

                  <td>
                    <Link
                      to={`/admin/order/${order._id}`}
                      className="btn "
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteOrderHandler(order._id)}
                      className="btn btn2"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default OrderList;
