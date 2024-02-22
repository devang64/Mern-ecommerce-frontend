import React, { useState, useEffect } from 'react'
import '../Features/Search.css'
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData/MetaData';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../redux/Action/ProductAction';
const Search = () => {
    ;
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
           
        } else {
            navigate('/products')
        }
       setKeyword('')
    }
    return (
        <>
            <div className='search-container'>
                <form className='search-box' onSubmit={searchSubmitHandler}>
                    <input
                        type='text'
                        placeholder='Search a Product...'
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }
                        }
                    />
                    <button type='submit'><i className="fa fa-search" /></button>
                </form></div>
        </>


    )
}

export default Search