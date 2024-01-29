import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getProducts();
  }, []);

  const onDeleteClick = product => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    axiosClient.delete(`/products/${product.id}`)
      .then(() => {
        setNotification('Product was successfully deleted');
        getProducts();
      })
      .catch(error => {
        console.error("Error deleting product:", error);
      });
  };

  const getProducts = () => {
    setLoading(true);
    axiosClient.get('/products')
      .then(({ data }) => {
        setLoading(false);
        setProducts(data.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Product</h1>
        <Link className="btn-add" to="/products/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product_name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.product_name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>{p.description}</td>
                  <td>
                    <Link className="btn-edit" to={'/products/' + p.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(p)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  );
}
