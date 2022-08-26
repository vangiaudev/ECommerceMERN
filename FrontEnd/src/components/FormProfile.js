import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "redux/Actions/UserActions";
import Loader from "./Loader";
import Message from "./Message";
import { ToastError, ToastSuccess } from "./ToastMessage";

const FormProfile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, userProfile } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setEmail(userProfile.email);
    }
  }, [userProfile]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(updateProfile({id: userProfile._id, name, email, password}))
      ToastSuccess("Cập nhật thông tin cá nhân thành công")
    } else {
      ToastError("Mật khẩu không trùng khớp");
    }
  };
  return (
    <>
            {/* {message && <Message variant="danger">{message}</Message>} */}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {updateLoading && <Message variant="success">Profile Updated</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Họ Tên</Form.Label>
          <Form.Control
            type="name"
            placeholder="Nhập họ tên"
            value={name}
            autoComplete="on"
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Địa Chỉ Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập địa chỉ email"
            value={email}
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Mật Khẩu Mới</Form.Label>
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
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            autoComplete="on"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="mt-3" type="submit" variant="primary">
          Update
        </Button>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default FormProfile;
