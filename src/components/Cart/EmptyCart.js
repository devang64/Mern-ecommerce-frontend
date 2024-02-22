import React from 'react'
import { NavLink } from 'react-router-dom'
import './EmptyCart.css'

const EmptyCart = () => {
    return (
        <>
            <div className=" empty-cart container-fluid  mt-100">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body cart">
                                <div className="col-sm-12 empty-cart-cls text-center">
                                    <img
                                        src="https://i.imgur.com/dCdflKN.png"
                                        width={130}
                                        height={130}
                                        className="img-fluid mb-4 mr-3"
                                    />
                                    <h3>
                                        <strong>Your cart is feeling lonely</strong>
                                    </h3>
                                    <NavLink
                                        to="/products"
                                        className="btn btn-primary cart-btn-transform m-3"
                                    >
                                        Start Shopping
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EmptyCart