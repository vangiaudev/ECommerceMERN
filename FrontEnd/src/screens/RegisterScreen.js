import FormContainer from "components/FormContainer";
import Loader from "components/Loader";
import Message from "components/Message";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { register } from "redux/Actions/UserActions";

const RegisterScreen = () => {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading } = userRegister;
  let { error} = userRegister
  useEffect(() => {
    if (userInfo) {
      if (!(userInfo === undefined || userInfo.length === 0))
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
 const submitHandler = (e) =>{
    e.preventDefault()
    if(password === confirmPassword){
      dispatch(register(name,email, password))
    }else{
      setMessage("Passwords do not match") 
    }
 }
  return (
    <FormContainer>
      <h1>Đăng Ký</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading &&  <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
          <Form.Label>Họ Tên</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            autoComplete="on"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          className="mt-3"
          type="submit"
          variant="primary"
          style={{ marginRight: "1rem" }}
        >
          Đăng ký
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Bạn đã có tài khoản ?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>

            &nbsp; Đăng nhập
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
