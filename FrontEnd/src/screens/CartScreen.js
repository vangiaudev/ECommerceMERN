import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "redux/Actions/CartActions";
import {
  ListGroup,
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";
import Message from "components/Message";
import { Link } from "react-router-dom";

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty");
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("CART", cartItems);

  useEffect(() => {
    dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);
  const removeFromCartHandler = (id) =>{
    dispatch(removeFromCart(id))
    navigate("/cart")
  }
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping")
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Giỏ Hàng</h1>
        {cartItems.length === 0 ? (
          <Message>
            Giỏ Hàng Bạn Đang Trống ! <Link to="/">MUA NGAY</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            <Table>
              <thead>
                <tr>
                  <th>Hình Ảnh</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Giá</th>
                  <th>Số Lượng</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr>
                    <td>
                      <Image
                        style={{ width: "100px" }}
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                        thumbnail
                      />
                    </td>
                    <td>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td>{item.price} VNĐ</td>
                    <td>
                      <Form.Control
                        style={{ padding: "0.25rem 0.35rem" }}
                        className="form-select"
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </td>
                    <td>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Tổng Số Sản Phẩm (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}{" "}
              VNĐ
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Tiến Hành Thanh Toán
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
