import React, { useEffect, useState } from 'react'
import './AdminHeader.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/Action/UserAction';
import Dropdown from 'react-bootstrap/Dropdown';
import Search from '../../Features/Search';
import Badge from '@mui/material/Badge';
import logo from '../../../Images/logo.png'
const AdminHeader = ({title}) => {
  const dispatch = useDispatch();
  const { verifyUserAuthenticate, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart)
  const myitem = localStorage.getItem("cartItems")
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  let totalQuantity = 0;
  for (const item of cartItems) {
    totalQuantity += item.quantity;
  }
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout());
    navigate('/login')
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`)

    } else {
      navigate('/products')
    }
    setKeyword('')
  }


  return (
    <>
    <div className='admin-header-shadow'>

   
      <div className="Admin-header">
     
        <div className='admin-heading'>
          <h4>{title}</h4>
        </div>
            <div className="menu-header-admin">
                  {/* User dropdown */}
                  {verifyUserAuthenticate ? (
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="#007ea7"
                          className="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                          />
                        </svg>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/" className="dropdown-item">Home</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/account" className="dropdown-item">Profile</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/orders" className="dropdown-item">My Orders</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} className="dropdown-item">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <NavLink to="/login" className="mx-2 login">
                      Login
                    </NavLink>
                  )}
                </div>
    
      </div>
      </div>
    </>
  )
}

export default AdminHeader