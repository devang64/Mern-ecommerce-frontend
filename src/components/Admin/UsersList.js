import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProduct, getProducts } from '../../redux/Action/ProductAction';
import VerticalTabs from './VerticalTabs';
import { toast } from 'react-toastify';
import './UsersList.css'
import { DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS } from '../../redux/Constants/ProductConstants';
import { deleteUser, getAllUsers } from '../../redux/Action/UserAction';
import { DELETE_USER_RESET } from '../../redux/Constants/UserContant';
import AdminHeader from './AdminHeader/AdminHeader';
const UsersList = () => {
  const Navigate = useNavigate();
  const { id } = useParams()
  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile); 

  const deleteUserHandler = (id) => {
    const confirmDelete = window.confirm("Do you want to delete this product?");
    if (confirmDelete) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      Navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, message]);
  return (
    <>
      <AdminHeader title={"Users Details"} />
    
    <div className='all-product'>
      <VerticalTabs />
      <div className="all-productContainer">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="product-list">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/admin/users/${user?._id}`} className="btn ">
                      Edit
                    </Link>
                    <button onClick={() => deleteUserHandler(user._id)} className="btn btn2">
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

export default UsersList;
