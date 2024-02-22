import React, { useState } from 'react'
import './Cart.css'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/Action/CartAction';
import { useNavigate } from 'react-router-dom';
import EmptyCart from './EmptyCart';

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  let totalQuantity = 0;
  for (const item of cartItems) {
    totalQuantity += item.quantity;
  }
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    const updatedCartItems = cartItems.filter((item) => item.product !== product);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  return (<>
    <div className='my-5'>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (<>
        <div className="addcard">
          <div className="row">
            <div className="col-md-8 cart">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h6>
                      <b>Shopping Cart</b>
                    </h6>
                  </div>
                </div>
              </div>
              <div class="cart-header d-none d-sm-none d-mb-block d-lg-block">
                <div class="row head-cart">
                  <div class="col-md-6 ">
                    <h6>Products</h6>
                  </div>
                  <div class="col-md-2">
                    <h6>Quantity</h6>
                  </div>
                  <div class="col-md-2">
                    <h6>Remove</h6>
                  </div>
                  <div class="col-md-2 ">
                    <h6>Price</h6>
                  </div>
                </div>
              </div>
              {cartItems.map((item) => (
                <div className="row border-top border-bottom">
                  <div className="row main align-items-center">
                    <div className="col-2">
                      <img className="img-fluid addimage" src={item.image} />
                    </div>
                    <div className="custom-cart-two col">
                      <div className='col-md-6'>{item.name}</div>

                      <div className="col-md-2 d-flex quantity">
                        <div
                          onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                          }
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>
                        </div>
                        <span className='quantity-icon'>{item.quantity}</span>
                        <div
                          onClick={() =>
                            increaseQuantity(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                          className=''
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className='remove-btn' onClick={() => handleRemoveFromCart(item.product)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      ₹{item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 summary">
              <div>
                <h5>
                  <b>Summary</b>
                </h5>
              </div>
              <hr />
              <div className="row">
                <div className="col" style={{ paddingLeft: 0 }}>
                  Total Items : {totalQuantity}
                </div>
              </div>
              <form>
                <p>GIVE CODE</p>
                <input id="code" placeholder="Enter your code" />
              </form>
              <div
                className="row"
                style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
              >
                <div className="col">TOTAL PRICE</div>
                <div className="col text-right">₹{totalPrice.toFixed(2)}</div>
              </div>
              <button className="btn  addbtn" onClick={checkoutHandler}>CHECKOUT</button>
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  </>
  );
}

export default Cart