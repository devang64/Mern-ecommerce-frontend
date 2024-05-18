import React, { useEffect, useState } from 'react';
import FeatureProducts from './FeatureProducts/FeatureProducts';
import MetaData from '../layout/MetaData/MetaData.js';
import { getProduct } from '../../redux/Action/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import '../Home/Home.css';
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/Action/ProductAction';
import Sliders from '../layout/Slider/Slider';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Category from '../layout/Category/Category';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector((state) => state.products);
  const settings = {
    className: "center",
    className: "slider variable-width",
    variableWidth: true,
    speed: 500,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          slidesToShow: 1,
        },
      },
    ],
  };
  const compareByDate = (product1, product2) => {
    const date1 = new Date(product1.createdAt);
    const date2 = new Date(product2.createdAt);
    return date2 - date1; // Sort in descending order (newest first)
  };
  const homeProduct = products.sort(compareByDate);
  const renderProductSlides = homeProduct.map((product) => (
    <div key={product._id} style={{ width: '250px', marginLeft: '20px' }}>
      <FeatureProducts product={product} />
    </div>
  ));
  const categories = [
    {
      categoryTag: "Earbuds",
      category: "earbuds",
      "image": "https://i.ibb.co/BfBvtGV/shopping-removebg-preview.png",
    },
    {
      categoryTag: "Smart Watch",
      category: "smartwatch",
      image: "https://i.ibb.co/Xypg8mq/kisspng-apple-watch-series-2-apple-watch-series-3-smartwat-black-smart-watch-5aa3dc83def0f3-38166769.png"
    },
    {
      categoryTag: "Headphone",
      category: "headphone",
      image: "https://i.ibb.co/4Z24VPj/Headphones-Transparent-PNG-1.png"
    },
    {
      categoryTag: "Speakers",
      category: "speakers",
      image: "https://www.pngall.com/wp-content/uploads/4/Wireless-Portable-Speaker-PNG-Clipart.png"
    },
    {
      categoryTag: "Neckbands",
      category: "neckbends",
      image: "https://i.ibb.co/gM2y4Jt/Png-Item-5470922.png",
    },
    {
      categoryTag: "Gaming Headphone",
      category: "gamingheadophone",
      image: "https://i.ibb.co/x7rX0sr/pngaaa-com-2676132.png"
    }];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());

  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={'Ecommerce'} />
          <div className='home-container'>
            <Sliders />
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className='mid-section'>
                  {/* Explore category section */}
                  <div className='mid-title-section'>
                    <h3>
                      Explore <span className='title-span'>Categories</span>
                    </h3>
                    <div className='category-section'>
                      <Category category={categories} />
                    </div>
                  </div>
                </div>
                {/* gurenty, warrenty section */}
                <div className='mid3-section'>
                  <div className='mid3-one-section'>
                    <img className="mid3-img" src='https://www.boat-lifestyle.com/cdn/shop/files/Group_334305_small.svg?v=1682336123' alt='warrenty' />
                    <h5 className='mid3-title'><span>1 Year </span>Warranty</h5>
                  </div>
                  <div className='mid3-one-section'>
                    <img className="mid3-img" src='https://www.boat-lifestyle.com/cdn/shop/files/Group_334304_small.svg?v=1682336123' alt='warrenty' />
                    <h5 className='mid3-title'><span>7 day </span>Replacement</h5>
                  </div>
                  <div className='mid3-one-section'>
                    <img className="mid3-img" src='https://www.boat-lifestyle.com/cdn/shop/files/Group_334303_small.svg?v=1682336123' alt='warrenty' />
                    <h5 className='mid3-title'><span>Free </span>Shipping</h5>
                  </div>
                  <div className='mid3-one-section'>
                    <img className="mid3-img" src='https://www.boat-lifestyle.com/cdn/shop/files/Group_334302_small.svg?v=1682336123' alt='warrenty' />
                    <h5 className='mid3-title'><span>GST </span>Billing</h5>
                  </div>
                </div>
                {/* New Launches product */}
                <div className='mid4-section'>
                  <div className='title-section'>
                    <h3>
                      New <span className='title-span'>Launches</span>
                    </h3>
                    <Link to={'/products'} className='btn '>View All<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg></span></Link>
                  </div>
                  <div className='mid2-section'>
                    <section className="center slider">
                      <div className='custom-slide'>
                        <Slider {...settings}>{renderProductSlides}</Slider>
                      </div>
                    </section>
                  </div>
                </div>

              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
