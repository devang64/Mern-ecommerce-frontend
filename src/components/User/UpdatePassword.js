import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UPDATE_PASSWORD_RESET } from '../../redux/Constants/UserContant';
import { clearErrors, loadUser, updatePassword } from '../../redux/Action/UserAction';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const { error, isUpdated, loading } = useSelector(state => state.profile);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePasswordSubmit = async (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    dispatch(loadUser()); // Load user information when the component mounts

    if (isUpdated) {
      toast.success('Password updated successfully!');
      navigate('/'); // Redirect to the home page or any other desired route after password update
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch({
      type: UPDATE_PASSWORD_RESET,
    });
  }, [dispatch, isUpdated, error, navigate]);

  return (
    <div className="container mt-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Update Password</h2>
                <form onSubmit={updatePasswordSubmit}>
                  <div className="form-group mt-4">
                    <input
                      type="password"
                      className="form-control "
                      placeholder="Old Password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mt-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mt-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button className="btn btn-primary btn-block mt-4" type="submit">
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
