import React, { useState, useEffect } from 'react'
import './UpdateUser.css'
import { useDispatch, useSelector } from 'react-redux'
import VerticalTabs from './VerticalTabs'
import { NEW_PRODUCT_RESET } from '../../redux/Constants/ProductConstants'
import { clearErrors, createProduct, } from '../../redux/Action/ProductAction'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUserDetails, updateUser } from '../../redux/Action/UserAction'
import { UPDATE_USER_RESET } from '../../redux/Constants/UserContant'
import AdminHeader from './AdminHeader/AdminHeader'
const UpdateUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.profile);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");


    useEffect(() => {
        console.log('Inside useEffect');
        console.log('user:', user);
        console.log('isUpdated:', isUpdated);
        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (isUpdated) {
            console.log(isUpdated)
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
        
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }


    }, [dispatch, error, isUpdated, updateError, user, id]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(id, myForm));
    };

    return (
        <>
            <AdminHeader title={"Update User Role"} />
     
        <div className='Newproduct'>
            <VerticalTabs />
            <div className="newProductContainer">
                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={updateUserSubmitHandler}
                >
                   
                    <div className="form__group">
                        <input
                            type="text"
                            placeholder=" Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form__field"
                        />
                    </div>
                    <div className="form__group">

                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form__field"
                        />
                    </div>

                    <div className="form__group">
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="form__field_select" >
                            <option value="">Choose Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <button
                        id="createProductBtn"
                        type="submit"
                        disabled={
                            updateLoading ? true : false || role === "" ? true : false
                        }
                        className='button-form'
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}

export default UpdateUser