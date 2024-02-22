import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../redux/Action/UserAction';
const ForgotPassword = () => {
  const [email,setEmail] = useState("")
  const dispatch = useDispatch();
  const {error, message, loading} = useSelector(state => state.forgotPassword)
  const forgotHandlerSubmit = (e) =>{
    e.preventDefault();
    console.log(email)
    dispatch(forgotPassword(email))
  }
  return (
    <><form onSubmit={forgotHandlerSubmit}>
      <input type='email' 
      value={email} 
      onChange={(e)=>{setEmail(e.target.value)}} 
      placeholder="Enter Your Email"
      required />
      <button className="btn btn-primary" type="submit" >Submit</button>
    </form></>
  )
}

export default ForgotPassword