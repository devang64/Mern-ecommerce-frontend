import React, { Fragment, useEffect, useRef } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./Payment.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../redux/Action/OrderAction";
import { createOrder } from "../../redux/Action/OrderAction"
const Payment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  // const BACKEND = 'https://mern-ecommerce-backend-mu.vercel.app'
  const BACKEND = 'http://localhost:5000'
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.gst,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BACKEND}/api/v1/payment/process`,
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              country: shippingInfo.country,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        // toast.error(error)
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }

    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error)
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors());
    }
  }, [dispatch, error])

  return (
    <>
      <form className="payment-form" onSubmit={submitHandler}>
        <h3>Card Info</h3>
        <div>
          <label>Card Number : </label>
          <CardNumberElement className="paymentInput" />
        </div>
        <div>
          <label>Expiration Date : </label>
          <CardExpiryElement className="paymentInput" />
        </div>
        <div>
          <label>CVC Number : </label>
          <CardCvcElement className="paymentInput" />
        </div>
        <div>
          <button className="submit" ref={payBtn}>Pay Now</button>
        </div>

      </form>
    </>
  )
}

export default Payment