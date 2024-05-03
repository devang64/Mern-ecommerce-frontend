import { React, useEffect } from 'react'
import MetaData from '../layout/MetaData/MetaData'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Loader from '../layout/Loader/Loader'
import { Link, Navigate } from 'react-router-dom'

import './Profile.css'

const Profile = () => {

    const { user, loading, verifyUserAuthenticate } = useSelector(state => state.user)
    console.log(user)
    return (
        <>
            {loading ? <Loader /> : verifyUserAuthenticate ? <>
                <MetaData title={`${user?.name}'s Profile`} />
                <section style={{ backgroundColor: "#fff" }}>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        {/* <img src={user.avatar.url} alt={user.name} /> */}
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            alt="avatar"
                                            className="rounded-circle img-fluid"
                                            style={{ width: 150 }}
                                        />
                                        <h5 className="my-3">{user?.name}</h5>
                                        <div className="d-flex justify-content-center mb-2">
                                            <button type="button" class="btn btn-light"><Link to="/profile/update">Edit Profile</Link></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Full Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{user?.name}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{user?.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        {/* <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Phone</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">(097) 234-5678</p>
              </div>
            </div>
            <hr /> */}

                                        {/* <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.address}</p>
              </div>
            </div> <hr />*/}

                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Joined On</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{String(user?.createdAt).substr(0, 10)}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <button as={Link
                                                } type="button" class="btn btn-light mt-2"> <Link to="/orders">My Orders</Link></button>

                                            </div>
                                            <div className="col-sm-7">
                                                <button as={Link
                                                } type="button" class="btn btn-light mt-2"> <Link to="/password/update">Change Password</Link></button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </> : <Navigate to='/login'></Navigate>}
        </>
    )
}

export default Profile