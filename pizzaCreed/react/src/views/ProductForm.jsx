
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function ProductForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [products, setProducts] = useState({
    id: null,
    product_name: '',
    category: '',
    price: '',
    description: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/products/${id}`)
        .then(({data}) => {
          setLoading(false)
          setProducts(data)
        })
        .catch(() => {
          setLoading(false)
        })
    },[])
  }

  const onSubmit = ev => {
    ev.preventDefault();
    if (products.id) {
      axiosClient.put(`/products/${products.id}`, products)
        .then(() => {
          setNotification('products was successfully updated')
          navigate('/products')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
        axiosClient.post('/products', products)
        .then(() => {
          setNotification('products was successfully created')
          navigate('/products')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {products.id && <h1>Update product: {products.name}</h1>}
      {!products.id && <h1>New Product</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input onChange={ev => setProducts({...products,  product_name: ev.target.value})} placeholder="Product_name"/>
            <input onChange={ev => setProducts({...products,  category: ev.target.value})} placeholder="Category"/>
            <input  onChange={ev => setProducts({...products, price: ev.target.value})} placeholder="Price"/>
            <input  onChange={ev => setProducts({...products, description: ev.target.value})} placeholder="Description"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
