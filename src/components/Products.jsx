import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../pages/Loader";
import "./styles/Products.css";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      await axios
        .get("https://guvi2-hackathon-backend-joshua.onrender.com/")
        .then((res) => {
          setLoading(false);
          setProducts(res.data);
        });
    };
    getProducts();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    // Filter based on category
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }

    // Filter based on search term
    if (
      searchTerm.trim() !== "" &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const renderProduct = (
    <div className="Products">
      {filteredProducts.length == 0 ? (
        <h1>No Products Found</h1>
      ) : (
        filteredProducts.map((product) => (
          <div className="Product">
            <img
              className="product-Image"
              src={product.image}
              width="150px"
              height="150px"
              alt="product"
            />
            <p className="product-Name">{product.name}</p>
            <p className="product-Price">Rs {product.price}/day</p>
            <Link to={`/product/${product._id}`} className="product-Button">
              Rent Now
            </Link>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="Product-Container">
      <div className="filter">
        <input
          className="filter-Input"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Product"
        />
        <select
          className="filter-Select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Home_Appliances">Home Appliances</option>
        </select>
      </div>
      {Loading ? <Loader /> : renderProduct}
    </div>
  );
};

export default Products;
