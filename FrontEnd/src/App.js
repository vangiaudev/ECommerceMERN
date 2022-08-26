import "bootstrap/dist/css/bootstrap.min.css";
import Header from "components/Header";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import CartScreen from "screens/CartScreen";
import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/LoginScreen";
import PaymentScreen from "screens/PaymentScreen";
import ProductDetailsScreen from "screens/ProductDetailsScreen";
import ProfileScreen from "screens/ProfileScreen";
import RegisterScreen from "screens/RegisterScreen";
import ShippingScreen from "screens/ShippingScreen";

import "./custom.scss";
function App() {
  return (
    <div className="App">
      <Header className="App-header" />

      <Container>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/product/:id" element={<ProductDetailsScreen />} />
          <Route path="/cart">
            <Route path=":id" element={<CartScreen />} />
            <Route path="" element={<CartScreen />} />
          </Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
