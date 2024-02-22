import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProduct, getProducts } from '../../redux/Action/ProductAction';
import VerticalTabs from './VerticalTabs';
import { toast } from 'react-toastify';
import './ProductList.css'
import { DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS } from '../../redux/Constants/ProductConstants';
import AdminHeader from './AdminHeader/AdminHeader';
const ProductList = () => {
  const Navigate = useNavigate();
  const { id } = useParams()
  const dispatch = useDispatch();
  const { error, products } = useSelector(state => state.products);
  const { error: deleteError, isDeleted } = useSelector(state => state.productModify);
  const deleteProductHandler = (id) => {
    const confirmDelete = window.confirm("Do you want to delete this product?");
    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    dispatch(getAdminProduct());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors())
    }
    if (isDeleted) {
      toast.success("Product Deleted Successfully")
      dispatch({ type: DELETE_PRODUCT_RESET })
    }

  }, [dispatch, error, isDeleted]);
  console.log(products);
  return (
    <>
      <AdminHeader title={"Products"} />
      <div className='all-product'>
        <VerticalTabs />
        <div className="all-productContainer">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="product-list">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>₹{product.price}</td>
                    <td>
                      <Link to={`/admin/products/${product._id}`} className="btn ">
                        Edit
                      </Link>
                      <button onClick={() => deleteProductHandler(product._id)} className="btn btn2 ">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
