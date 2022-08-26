import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "redux/Actions/CartActions";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="address">
        <Form.Label>Địa Chỉ</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập địa chỉ nhận hàng"
          value={address}
          required
          autoComplete="on"
          onChange={(e) => setAddress(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label>Tỉnh / Thành Phố</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên Tỉnh / Thành Phố"
          value={city}
          required
          autoComplete="on"
          onChange={(e) => setCity(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="postalCode">
        <Form.Label>Mã Bưu Điện</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập mã bưu điện"
          value={postalCode}
          required
          autoComplete="on"
          onChange={(e) => setPostalCode(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="country">
        <Form.Label>Quốc Gia</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên quốc gia"
          value={country}
          required
          autoComplete="on"
          onChange={(e) => setCountry(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button className="mt-3" type="submit" variant="primary">
        {" "}
        Tiếp tục{" "}
      </Button>
    </Form>
  );
};

export default ShippingScreen;
