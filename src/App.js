import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Rent from "./pages/Rent";
import OrderPage from "./pages/OrderPage";
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Forgot from "./pages/Forgot"
import Loader from "./pages/Loader"
import Reset from "./pages/Reset"
import { Provider, useSelector } from "react-redux";
import store from './store/store'
import { selectUser } from "./store/userSlice";

function App() {
  const user = useSelector(selectUser);
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route path='/contact' element={user ? <ContactPage /> : <Login />} />
        <Route path='/product/:id' element={user ? <Rent /> : <Login />} />
        <Route path="/orders" element={user ? <OrderPage /> : <Login />} />
        <Route path='/signup' element={user ? <Navigate to='/' /> : <SignUp />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>

    </BrowserRouter>


  );
}

export default App;
