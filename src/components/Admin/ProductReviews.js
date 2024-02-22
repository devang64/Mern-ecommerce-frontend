import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearErrors, deleteProduct, deleteReviews, getAdminProduct, getAllReviews, getProducts } from '../../redux/Action/ProductAction';
import VerticalTabs from './VerticalTabs';
import { toast } from 'react-toastify';
import './ProductReviews.css'
import { DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_RESET } from '../../redux/Constants/ProductConstants';
import AdminHeader from './AdminHeader/AdminHeader';
const ProductReviews = () => {
    const Navigate = useNavigate();
    const { id } = useParams()
    const dispatch = useDispatch();
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.review
    );

    const { error, reviews, loading } = useSelector(
        (state) => state.productReviews
    );

    const [productId, setProductId] = useState("");
    const [showTable, setShowTable] = useState(false);

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        setShowTable(true);
        dispatch(getAllReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success("Review Deleted Successfully");
            Navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted, productId]);
    return (
        <>
            <AdminHeader title={"Reviews"} />
        
        <div className='all-review'>
            <VerticalTabs />
            <div className="all-reviewContainer">
                {error && <div className="toast toast-danger">{error}</div>}
                <form
                    className="productReviewsForm"
                    onSubmit={productReviewsSubmitHandler}
                >

                    <div className="form__group field">
                        <input
                            type="text"
                            placeholder="Enter Product Id"
                            required
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="form__field"
                        />
                        <label for="name" className="form__label">Enter Product Id</label>
                    </div>

                    <button
                        id="createProductBtn"
                        type="submit"
                        disabled={
                            loading ? true : false || productId === "" ? true : false
                        }
                        className='button-form'
                    >
                        Search
                    </button>
                </form>
                {showTable ? (
                    <div>
                        {reviews && reviews.length > 0 ? (
                            <div className="review-list">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Review ID</th>
                                            <th>Name</th>
                                            <th>Comment</th>
                                            <th>Rating</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reviews && reviews.map(item => (
                                            <tr key={item._id}>
                                                <td>{item._id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.comment}</td>
                                                <td>{item.rating}</td>
                                                <td>
                                                    <button onClick={() => deleteReviewHandler(item._id)} className="btn btn-danger btn-sm">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>) : (<h1 className="productReviewsFormHeading">No Reviews Found</h1>)}
                    </div>
                ) : ''}


            </div>
        </div></>
    );
};

export default ProductReviews;
