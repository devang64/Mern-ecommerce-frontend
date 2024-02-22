import React, { useState, useEffect } from 'react';
import './UpdateProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import VerticalTabs from './VerticalTabs';
import { UPDATE_PRODUCT_RESET } from '../../redux/Constants/ProductConstants';
import { clearErrors, getProductDetails, updateProduct } from '../../redux/Action/ProductAction';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminHeader from './AdminHeader/AdminHeader';
const UpdateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { error, product } = useSelector(state => state.productDetails);
    const { loading, error: updateError, isUpdated, } = useSelector((state) => state.productModify);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const categories = [
        "speakers",
        "neckbends",
        "headphone",
        "smartwatch",
        "earbuds",
        "gamingheadophone",
    ];

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        if (!product.name || product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
            console.log(stock)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            navigate('/admin/products');
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }


    }, [dispatch, id, product, isUpdated, navigate]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        console.log(stock)
        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(id, myForm));
    };

    return (
        <>
            <AdminHeader title={"Update Product"}/>
      
        <div className='Newproduct'>
                <VerticalTabs />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                      
                        <div className="form__group field">
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form__field"
                            />
                            <label for="name" className="form__label">Product Name</label>
                        </div>
                        <div className="form__group field">

                            <input
                                type="number"
                                placeholder="Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="form__field"
                            />
                            <label for="name" className="form__label">Price</label>
                        </div>

                        <div className="form__group field">
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="3"
                                className="form__field"
                            ></textarea>
                            <label for="name" className="form__label">Description</label>
                        </div>

                        <div className="form__group field">
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="form__field_select" >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                            <label for="name" className="form__label">Category</label>
                        </div>

                        <div className="form__group field">
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="form__field"
                            />
                            <label for="name" className="form__label">Stock</label>
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Product Preview" />
                            ))}
                        </div>
                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                            className='button-form'
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateProduct;
