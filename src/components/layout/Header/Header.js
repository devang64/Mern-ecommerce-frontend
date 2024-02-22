import React, { useEffect, useState } from 'react'
import '../Header/Header.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/Action/UserAction';
import Dropdown from 'react-bootstrap/Dropdown';
import Search from '../../Features/Search';
import Badge from '@mui/material/Badge';
import logo from '../../../Images/logo.png'
const Header = () => {
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
      <header className="section-header ">
        <section className="header-main border-bottom ">
          <div className="container-fluid">
            <div className="row p-2 pt-3 pb-3 align-items-center">
              {/* Logo */}
              <div className="col-md-2 col-6">
                <Link to='/'>
                  <img
                    className=""
                    src={logo}
                    width="100"
                  />
                </Link>

              </div>
              {/* Search */}
              <div className="col-md-8 col-6">
                <form className="d-flex align-items-center" onSubmit={searchSubmitHandler}>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search a Product..."
                      className="form-control"
                      value={keyword}
                      onChange={(e) => {
                        setKeyword(e.target.value);
                      }}
                    />
                    <button type="submit" className="search-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              {/* Cart and User */}
              <div className="col-md-2 d-none d-md-flex align-items-center justify-content-end">
                <NavLink to='/cart' className="mx-2">
                  <Badge badgeContent={totalQuantity} sx={{
                    "& .MuiBadge-badge": {
                      color: "#ffffff",
                      backgroundColor: "#007ea7"
                    }
                  }}   >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#007ea7"
                      className="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                      />
                    </svg>
                  </Badge>
                </NavLink>
                <div className="d-flex flex-column ms-2">
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
                        {user && user.role === 'admin' ? (
                          <>
                            <Dropdown.Item as={NavLink} to="/admin/dashboard">
                              Dashboard
                            </Dropdown.Item>
                          </>
                        ) : null}
                        <Dropdown.Item as={NavLink} to="/account" className="dropdown-item">Account</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/orders" className="dropdown-item">Orders</Dropdown.Item>
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
          </div>
        </section>

        <nav class="nav-custom navbar navbar-expand-lg navbar-light ">
          <div class="container-fluid ">
            <button
              class="navbar-toggler custom-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            {/* Show content on smaller screens */}
            <div class="d-flex flex-row d-md-none d-lg-none align-items-center">
              <NavLink to='/cart' className="mx-2">
                <Badge badgeContent={totalQuantity} sx={{
                  "& .MuiBadge-badge": {
                    color: "#ffffff",
                    backgroundColor: "#007ea7"
                  }
                }}   >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#007ea7"
                    className="bi bi-bag"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                    />
                  </svg>
                </Badge>
              </NavLink>
              <div className="ms-2 drop-bar ">
                {/* User dropdown */}
                {verifyUserAuthenticate ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        />
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {user && user.role === 'admin' ? (
                        <>
                          <Dropdown.Item as={NavLink} to="/admin/dashboard">
                            Dashboard
                          </Dropdown.Item>
                        </>
                      ) : null}
                      <Dropdown.Item as={NavLink} to="/account" className="dropdown-item">Account</Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/orders" className="dropdown-item">Orders</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout} className="dropdown-item">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <NavLink to="/login" className="mx-2 navlink-login" >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
              <ul class="navbar-nav ">
                <li class="nav-item ">
                  <NavLink className="custom-link" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li class="nav-item ">
                  <NavLink className="custom-link" aria-current="page" to="/products">
                    Products
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink className="custom-link" aria-current="page" to="/contact">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header