import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, clearErrors } from '../../redux/Action/ProductAction';
import FeatureProducts from '../Home/FeatureProducts/FeatureProducts';
import MetaData from '../layout/MetaData/MetaData';
import { useLocation, useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Loader from '../layout/Loader/Loader';
import Filter from '../Features/Filter';
import './Product.css'
const Products = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);
  const keyword = params.keyword;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({});

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const applyFilter = (newFilter) => {
    // Update the local filter state
    setFilter(newFilter);
    // Dispatch an action to fetch filtered products based on the new filter
    dispatch(getProduct(keyword, currentPage, newFilter.price, newFilter.category));
  };
  const compareByDate = (product1, product2) => {
    const date1 = new Date(product1.createdAt);
    const date2 = new Date(product2.createdAt);
    return date2 - date1; // Sort in descending order (newest first)
  };
  products.sort(compareByDate);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    const category = searchParams.get('category');
    if (!category) {
      dispatch(getProduct(keyword, currentPage, filter.price, filter.category));
    } else {
      dispatch(getProduct(keyword, currentPage, filter.price, category));
    }


  }, [dispatch, keyword, currentPage, filter]);


  return (
    <>
      {loading ? <Loader /> : (
        <>
          <MetaData title={'All Products'} />
          <div className='product-div'>
            <div className='product-filter-div'>
              <Filter className="product-filter" applyFilter={applyFilter} />
            </div>
            <div className='product-show-div'>
              <div className='product-feature-div'>
                {products &&
                  products.map((product) => (
                    <FeatureProducts className="product-features-component" key={product._id} product={product} />
                  ))}
              </div>
              <div className='product-pagination'>
                {resultPerPage < filteredProductsCount && (
                  <div className='pagination-box'>
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Products;
