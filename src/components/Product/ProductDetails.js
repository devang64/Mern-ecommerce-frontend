import { React, useEffect, useState } from 'react'
import '../Product/ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../redux/Action/ProductAction'
import { NavLink, useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader'
import { CLEAR_ERRORS } from '../../redux/Constants/ProductConstants'
import MetaData from '../layout/MetaData/MetaData'
import { toast } from 'react-toastify'
import { addToCart } from '../../redux/Action/CartAction'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import { NEW_REVIEW_RESET } from '../../redux/Constants/ProductConstants'
const ProductDetails = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productDetails)
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  console.log(product)
  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return
    }
    const qty = quantity + 1;
    setQuantity(qty)
  }
  const decreaseQuantity = () => {
    if (1 >= quantity) {
      return
    }
    const qty = quantity - 1;
    setQuantity(qty)
  }
  const addToHandler = () => {
    dispatch(addToCart(params.id, quantity))
    toast.success("Item Added to Cart")
  }

  const options = {
    size: "medium",
    value: product.rating,
    readOnly: true,
    precision: 0.5
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    const productId = params.id;
    dispatch(getProductDetails(productId))
  }, [dispatch, error, reviewError, success, params.id])

  return (
    <>
      {loading ? <Loader /> : (<>
        <MetaData title={`${product.name}`} />
        <div className="py-3 py-md-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-5 mt-3 image-container">
                <div className="main-img">
                  <img
                    src={selectedImage || (product.images && product.images.length > 0 ? product.images[0].url : '')
                    }
                    className="w-100" alt="Img"
                  />
                </div>
                <div className='img-list'>
                  {product.images &&
                    product.images.map((item, i) => (
                      <div className="image_list" key={i}>
                        <li className='image_list_item' data-image={`${item.url}`} onClick={() => handleImageClick(item.url)} >
                          <img
                            src={`${item.url}`}
                            alt={item.altImage}
                          />
                        </li>
                      </div>
                    ))}

                </div>
              </div>
              <div className="col-md-7 mt-3">
                <div className="product-view">
                  <h4 className="product-name">
                    {product.name}
                    <label className="label-stock bg-success">In Stock : {product.stock}</label>
                  </h4>
                  <hr />
                  <p className="product-path">Category : {product.category}</p>
                  <div className="product-rating">
                    <span className="badge badge-success">
                      <Rating {...options} />
                    </span>
                    <span className="rating-review">({product.numofReviews} Reviews)</span>
                  </div>
                  <div>
                    <span className="selling-price">₹{product.price}</span>
                    <span className="original-price">₹{product.price + 300}</span>
                  </div>
                  <div className="mt-2">
                    <div className="input-group">
                      <span className="btn btn1" onClick={decreaseQuantity}>
                        <i className="fa fa-minus" />
                      </span>
                      <input type="text" value={quantity} className="input-quantity" />
                      <span className="btn btn1" onClick={increaseQuantity}>
                        <i className="fa fa-plus" />
                      </span>
                    </div>
                  </div>
                  <div className="buttons-product">
                    <a className="btn btn2" disabled={product.stock < 1 ? true : false}
                      onClick={addToHandler}>
                      <i className="fa fa-shopping-cart" /> Add To Cart
                    </a>
                    
                    <a className="btn btn3" onClick={handleClickOpen}>

                      <i className="fa fa-star" /> Submit Review
                    </a>
                    <Dialog
                      aria-labelledby="simple-dialog-title"
                      open={open}
                      onClose={handleClose}>
                      <DialogTitle>Submit Review</DialogTitle>
                      <DialogContent className="submitDialog">
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large" s
                        />
                        <textarea
                          className="submitDialogTextArea"
                          cols="30"
                          rows="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                          Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-3">
                <div className="card">
                  <div className="card-header">
                    <h4>Description</h4>
                  </div>
                  <div className="card-body">
                    <p>
                    {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card  mt-3">
              <h4 className='card-header' >Reviews</h4>

              {product.reviews && product.reviews[0] ? (
                <div className='reviews'>
                  {product.reviews.map(reviews => (<ReviewCard review={reviews} />))}
                </div>
              ) : (<p> No Review Yet</p>)}</div>
          </div>
        </div>
      </>
      )}
    </>
  )
}

export default ProductDetails