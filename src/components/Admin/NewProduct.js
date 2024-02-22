import React, { useState, useEffect } from 'react'
import './NewProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import VerticalTabs from './VerticalTabs'
import { NEW_PRODUCT_RESET } from '../../redux/Constants/ProductConstants'
import { clearErrors, createProduct, } from '../../redux/Action/ProductAction'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminHeader from './AdminHeader/AdminHeader'
const NewProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, success } = useSelector(state => state.newProduct)
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const createProductSubmitHandler = (e) => {
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
    dispatch(createProduct(myForm));
  };
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
  const categories = [
    "speakers",
    "neckbends",
    "headphone",
    "smartwatch",
    "earbuds",
    "gamingheadphone",
  ];

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    console.log(categories)
    if (success) {
      navigate("/admin/products");
      toast.success("Product Created Successfully")
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success]);
  return (
    <>
      <AdminHeader title={'Create New Product'} />

      <div className='Newproduct'>
        <VerticalTabs />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
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
               <label for="name" className="form__label">Product Description</label>
            </div>

            <div className="form__group ">
              <select onChange={(e) => setCategory(e.target.value)} className="form__field_select">
                <option value="" className='form__label2'>Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div  className="form__group ">
              <input
                type="number"
                placeholder="stock"
                required
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
                onChange={createProductImagesChange}
                multiple
                className=""
              />
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
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewProduct