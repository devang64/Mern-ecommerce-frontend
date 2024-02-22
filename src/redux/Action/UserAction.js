// userActions.js
import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS, LOGOUT_FAIL,
  CLEAR_ERRORS, CLEAR_USER, UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS, FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_SUCCESS,
  UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../Constants/UserContant';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';



export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/forgot`, { email }, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {

    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
  }
};
export const resetPassword = (token, newPassword, newConfirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/reset/${token}`, { token, newPassword, newConfirmPassword }, config);
    if (data.success) {
      toast.success("Password reset successfully")
    }
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    console.log(error)
    dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    if (data.success) {
      toast.success("Login Successfull")
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    <Navigate to={'/account'} />
  } catch (error) {
    console.log(error)
    dispatch({ type: LOGIN_FAIL, payload: error.response ? error.response.data.message : error.message, });
  }
};
// Register Action
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/register', { name, email, password }, config);
    if (data.success) {
      toast.success("Register Successfull")
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    <Navigate to={'/account'} />
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
export const updatePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put('/api/v1/password/update', { oldPassword, newPassword, confirmPassword }, config);
    console.log(data)
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    dispatch(loadUser());
    dispatch({ type: LOAD_USER_SUCCESS });
    window.location.href = '/account'
    toast.success("Profile Updated Successfully")

  } catch (error) {
    console.log(error)
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
export const updateProfile = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/profile/update', { name, email }, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    dispatch(loadUser());
    dispatch({ type: LOAD_USER_SUCCESS });
    window.location.href = '/account'
    toast.success("Profile Updated Successfully")

  } catch (error) {
    console.log(error)
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
// Load User Action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`/api/v1/profile`);
    if (data.success) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } else {
      // User is not authenticated, clear user data in the store
      dispatch({ type: LOAD_USER_FAIL, payload: data.message });
    }

  } catch (error) {
    console.log(error);
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};
export const logout = () => async (dispatch) => {
  try {
    await axios.post
      (`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
    toast.success("Logged Out successfull")
    dispatch({ type: CLEAR_USER });
  } catch (error) {
    console.log(error)
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};
// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};
// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};
// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/users/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS,payload: true,});
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/users/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors Action
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

