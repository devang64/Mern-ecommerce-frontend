import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../redux/Action/UserAction';
import { toast } from "react-toastify";
import { UPDATE_PASSWORD_RESET, UPDATE_PROFILE_RESET } from '../../redux/Constants/UserContant';
import { clearErrors } from '../../redux/Action/UserAction';
import { Navigate, useNavigate,useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const ResetPassword = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const { error, success, loading } = useSelector(state => state.forgotPassword);
    const [newPassword, setnewPassword] = useState('');
    const [newConfirmPassword, setnewConfirmPassword] = useState('');

    const updatePasswordSubmit = async (e) => {
        e.preventDefault();
        const token = params.token
        console.log(token)
        if (newPassword === newConfirmPassword) {
            dispatch(resetPassword(token, newPassword, newConfirmPassword));
            <Navigate to={'/login'} />
            
          } else {
            toast.error("password not same")
          }
        
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success){
            toast.success("Password reset component");
        }
        dispatch({
            type: UPDATE_PASSWORD_RESET,
        })

    }, [error, dispatch,success])
    return (
        <>
            {loading ? <Loader /> : <>
                <div>
                    <div>
                        <h2>Update Profile</h2>
                        <form onSubmit={updatePasswordSubmit}>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    name='newPassword'
                                    value={newPassword}
                                    onChange={(e) => setnewPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name='newConfirmPassword'
                                    value={newConfirmPassword}
                                    onChange={(e) => setnewConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" type="submit">Save Password</button>
                        </form>
                    </div>
                </div>
            </>}
        </>
    )
}

export default ResetPassword