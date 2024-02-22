import React, { useState } from 'react';
import './Shipping.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo, cartItems } from '../../redux/Action/CartAction';
import { useNavigate } from 'react-router-dom';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
function Shipping() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
console.log(cartItems)
  const [shippingDetails, setShippingDetails] = useState({
    // fullName: shippingInfo.fullName,
    // phoneNumber : shippingInfo.phoneNumber,
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    state:'',
    country: ''
    // fullName: shippingInfo.fullName,
    // phoneNumber: shippingInfo.phoneNumber,
    // address: shippingInfo.address,
    // city: shippingInfo.city,
    // postalCode: shippingInfo.postalCode,
    // state: shippingInfo.state,
    // country: shippingInfo.country
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
  });

  const [step, setStep] = useState(1);

  const handleOrderSummury = () => {

    const subtotal = calculateSubtotal()
    const gst = calculateGST()
    const shippingCharges = 0 // You can update this if needed
    const totalPrice = calculateTotalPrice();
    const data = {
      subtotal,gst,shippingCharges,totalPrice
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate('/process/payment')
  }

  const handleContinue = () => {
    if (step === 1) {
      const validatedShippingInfo = { ...shippingDetails }; // Copy the input values
      dispatch(saveShippingInfo(validatedShippingInfo));

      setStep(2);
    } else if (step === 2) {
      handleOrderSummury();
      navigate('/process/payment')
      // setStep(3);
    }
  };

  const handleModifyShippingDetails = () => {
    setStep(1);
  };

  // Function to calculate the subtotal of cart items
  const calculateSubtotal = () => {
    return cartItems.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
  };

  // Function to calculate GST (2% of each product's price)
  const calculateGST = () => {
    const gstRate = 0.02;
    return cartItems.reduce((gst, item) => gst + item.price * item.quantity * gstRate, 0);
  };

  // Function to calculate total price (subtotal + GST + shipping charges)
  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal();
    const gst = calculateGST();
    const shippingCharges = 0; // You can update this if needed
    return subtotal + gst + shippingCharges;
  };
  return (
    <div className="shipping-payment-container">
      <h2 className="step-heading">Step {step}: {step === 1 ? 'Shipping Details' : step === 2 ? 'Order Confirmation' : 'Payment'}</h2>
      {step === 1 ? (
        <form>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={shippingDetails.fullName}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  fullName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="fullName">Phone Number</label>
            <input
              type="text"
              id="fullName"
              placeholder='Phone Number'
              value={shippingDetails.phoneNumber}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={shippingDetails.address}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="City"
              value={shippingDetails.city}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  city: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              placeholder="State"
              value={shippingDetails.state}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  state: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              placeholder="Postal Code"
              value={shippingDetails.postalCode}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  postalCode: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Country"
              value={shippingDetails.country}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  country: e.target.value,
                })
              }
            />
          </div>
          <button className="continue-button" type="button" onClick={handleContinue}>Continue</button>
        </form>
      ) : step === 2 ? (
        <div>
          <h3 className="order-summary-heading">Order Summary</h3>
          <div className="order-summary-details">
            {/* Display shipping info */}
            <div className="shipping-info-display">
              <h4>Shipping Information:</h4>
              <p><strong>Full Name:</strong> {shippingInfo.fullName}</p>
              <p><strong>Address:</strong> {shippingInfo.address}</p>
              <p><strong>Phone Number:</strong> {shippingInfo.phoneNumber}</p>

            </div>

            {/* Display cart items and order summary */}
            <div className="cart-items-summary">
              <h4>Cart Items:</h4>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                  <img src={item.image}/>
                    {item.name} ({item.quantity} x ₹{item.price.toFixed(2)})
                  </li>
                ))}
              </ul>

              <h4>Order Summary:</h4>
              <p>Subtotal: ₹{calculateSubtotal().toFixed(2)}</p>
              <p>GST (2%): ₹{calculateGST().toFixed(2)}</p>
              <p>Shipping Charges: ₹0.00</p>
              <p><strong>Total Price: ₹{calculateTotalPrice().toFixed(2)}</strong></p>
            </div>
          </div>

          <button className="modify-shipping-button" type="button" onClick={handleModifyShippingDetails}>
            Edit Shipping Details
          </button>
          <button className="continue-button" type="button" onClick={handleContinue}>Continue</button>
        </div>
      ) :  null}
    </div>
  );
}

export default Shipping;
