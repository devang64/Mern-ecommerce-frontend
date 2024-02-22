import React, { useState } from 'react'
import './Category.css'
import { Link } from 'react-router-dom';
const Category = ({ category }) => {
    return (
        <>
            {category.map((item, index) => {
                return <div className='desktop-products' key={index}>
                    <div className="category-container">
                        <div className="card">
                            <div className="imgBx">
                                <img src={item.image} alt={item.category} />
                            </div>
                            <div className="contentBx">
                                <h4>{item.categoryTag}</h4>
                                <div className="size">
                                </div>
                                <Link
                                    className='link'
                                    to={`/products?category=${item.category}`
                                    } >Check Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            })}

        </>
    )
}

export default Category