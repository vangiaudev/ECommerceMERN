import FormContainer from "components/FormContainer";
import Loader from "components/Loader";
import Message from "components/Message";
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {login} from "redux/Actions/UserActions";

const LoginScreen = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;
  useEffect(() => {
    if (userInfo) {
      if (!(userInfo === undefined || userInfo.length === 0))
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
 const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(login(email, password))
 }
  return (
    <FormContainer>
      <h1>Đăng Nhập</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading &&  <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Tài Khoản</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập địa chỉ email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Mật Khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          className="mt-3"
          type="submit"
          variant="primary"
          style={{ marginRight: "1rem" }}
        >
          Đăng nhập
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Bạn chưa có tài khoản ?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            &nbsp; Tạo tài khoản
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
