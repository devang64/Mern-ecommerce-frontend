import React, { useEffect } from 'react'
import { clearErrors, myOrders } from '../../redux/Action/OrderAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import './MyOrder.css'
const MyOrder = () => {
    const dispatch = useDispatch()
    const { loading, error, orders } = useSelector(state => state.myOrder);
    console.log(orders)
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, error]);
    return (
        <>
            {loading ? <Loader /> : <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Order Id</th>
                        <th scope="col">Status</th>
                        <th scope="col">Item QTY</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((item, index) => (
                        <tr key={item?._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item?._id}</td>
                            <td>{item?.orderStatus}</td>
                            <td>{item?.orderItems.length}</td>
                            <td>{item?.totalPrice}</td>
                            <td>
                                <Link
                                    to={`/order/${item?._id}`}
                                    className="btn"
                                >
                                    View Details
                                </Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </>
    )
}

export default MyOrder