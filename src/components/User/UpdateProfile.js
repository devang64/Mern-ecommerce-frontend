import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../redux/Action/UserAction';
import { toast } from 'react-toastify';
import { UPDATE_PROFILE_RESET } from '../../redux/Constants/UserContant';
import { clearErrors } from '../../redux/Action/UserAction';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch({
      type: UPDATE_PROFILE_RESET,
    });
  }, [error, dispatch, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Update Profile</h2>
                  <form onSubmit={updateProfileSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
