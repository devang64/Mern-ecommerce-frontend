import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import VerticalTabs from './VerticalTabs';
import MetaData from '../layout/MetaData/MetaData';
import { Link } from 'react-router-dom';
import './Dashboard.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { getAdminProduct } from '../../redux/Action/ProductAction';
import { getAllUsers } from '../../redux/Action/UserAction';
import { getAllOrders } from '../../redux/Action/OrderAction';
import AdminHeader from './AdminHeader/AdminHeader';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const LineData = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: 'Total Amount',
        data: [totalAmount - totalAmount, totalAmount],
        borderColor: '#003459',
        backgroundColor: '#ffff',
      }
    ],
  };
  const doughnutData = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#003459", "#00a8e8"],
        hoverBackgroundColor: ["#003459", "#007ea7"],
        data: [outOfStock, products?.length - outOfStock],

      },
    ],
  };


  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);


  return (
    <>
      <MetaData title="Dashboard - Admin Panel" />
      <AdminHeader title={"Dashboard"} />
      <div className="dashboard">
        <VerticalTabs />
        <div className="dashboardContainer">
          <div className="dashboardSummaryBox2">
            <Link className="dashboardSummaryBox2_1" >
              <p>Net Revenue</p>
              <h4>₹{totalAmount}</h4>
            </Link>
            <Link to="/admin/products" className="dashboardSummaryBox2_2" >
              <p>Products</p>
              <h4>{products && products?.length}</h4>
            </Link>
            <Link to="/admin/orders" className="dashboardSummaryBox2_3" >
              <p>Orders</p>
              <h4>{orders && orders?.length}</h4>
            </Link>
            <Link to="/admin/users" className="dashboardSummaryBox2_4" >
              <p>Users</p>
              <h4>{users && users?.length}</h4>
            </Link>
          </div>
          <div className='charts'>
            <div className='line-chart'>
              <Line
                data={LineData}
              />
            </div>
            <div className='line-chart2'>
              <Doughnut
                data={doughnutData}
              />
            </div>
          </div>

        </div>
      </div></>
  )
}

export default Dashboard