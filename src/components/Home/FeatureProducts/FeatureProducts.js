import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import './FeatureProducts.css'
import { Rating } from "@mui/material";


const Product = ({ product }) => {
 
  const options = {
    size: "small",
    value: product.rating,
    readOnly: true,
    precision: 0.5
  };
  const firstImage = product.images && product.images.length > 0 ? product.images[0].url : '';
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div className="productCard-container " >
        <div className="product p-0">
          <div className="img-wrap">
            <img className='rounded ' src={firstImage} alt={product.name} />
          </div>
          <div className="info-wrap" >
            <span className="category">{product.category}</span>
            <h5 className="title ">{product.name}</h5>
            <div className="action-wrap">
              <div className="price-wrap ">
                <span className="price-new">₹{product.price}</span>
              </div>
              <div classNames="product-rating">
                <Rating  {...options} /></div>
            </div>
          </div>
        </div>
      </div>

    </Link>
  );
};
export default Product;