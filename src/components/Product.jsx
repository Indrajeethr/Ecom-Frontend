import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DateRangePicker } from "react-date-range";
import { differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css"; // Import the default styles
import "react-date-range/dist/theme/default.css"; // Import the default theme
import { selectUser } from "../store/userSlice";
import { useSelector } from "react-redux";

import "./styles/Product.css";
const Product = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [days, setDays] = useState(1);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        await axios
          .get(
            `https://guvi2-hackathon-backend-joshua.onrender.com/product/${id}`
          )
          .then((response) => {
            setName(response.data.name);
            setPrice(parseInt(response.data.price));
            setImage(response.data.image);
          });
      } catch (err) {}
    };
    getProduct();
  }, []);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleDateRangeChange = (ranges) => {
    setDateRange(ranges.selection);
  };

  const calculateNumberOfDays = () => {
    const { startDate, endDate } = dateRange;
    const numberOfDays = differenceInDays(endDate, startDate) + 1;
    setDays(parseInt(numberOfDays));
  };

  const decr = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity);
    }
  };

  const handleSubmit = () => {
    let total = price * quantity * days;
    var options = {
      key: "rzp_test_X7wyTequWbZztC",
      key_secret: "iSuJOcWj21RnQVUIBFeVoF1w",
      amount: total * 100,
      currency: "INR",
      name: "RENTAL PROJECT",
      description: "For Project Purpose",
      handler: async function (response) {
        await axios
          .post(
            `https://guvi2-hackathon-backend-joshua.onrender.com/addOrder`,
            {
              email: user.email,
              product_Name: name,
              quantity: quantity,
              price: total,
              total_days: days,
              image: image,
              payment_id: response.razorpay_payment_id,
            }
          )
          .then((res) => {
            alert("Payment Successful");
            navigate("/orders");
          });
      },
      notes: {
        address: "Bangalore",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div>
      <div className="product">
        <div className="sub-section">
          <img
            className="single-image"
            src={image}
            width="200px"
            height="200px"
          />
          <p>
            <b>{name}</b>
          </p>
          <p>Rs {price}/day</p>
          <div className="quantity">
            <span>Quantity</span>
            <button onClick={decr}>-</button>
            <span>{quantity}</span>
            <button
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
          </div>

          <p>
            No of Days <b>{days}</b> Price <b>{price * days * quantity}</b>
          </p>
          <button onClick={handleSubmit} className="rent">
            Pay Now
          </button>
        </div>

        <div className="sub-section2">
          <p>
            Select the start and end dates you want to rent this product and
            click on apply:
          </p>
          <div>
            <DateRangePicker
              staticRanges={[]}
              inputRanges={[]}
              ranges={[dateRange]}
              onChange={handleDateRangeChange}
            />
          </div>

          <button className="rent" onClick={calculateNumberOfDays}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
