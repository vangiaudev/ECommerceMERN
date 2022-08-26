
import Loader from "components/Loader";
import Meta from "components/Meta";
import Rating from "components/Rating";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import classes from "./ProductScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { detailsProduct } from "redux/Actions/ProductActions";
import Message from "components/Message";

const ProductDetailsScreen = () => {
  // const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1)
  const productDetails = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, products } = productDetails;
  useEffect(() => {
    // const fetchSingleProduct = async () => {
    //   const { data } = await axios.get(`/api/products/${id}`);
    //   setProduct(data);
    // };
    dispatch(detailsProduct(id));
    // fetchSingleProduct();
  }, [dispatch, id]);
  const AddToCartHandle = (e) => {
    e.preventDefault();
    navigate(`/cart/${id}?qty=${qty}`);
  }

  return (
    <div>
      <Link className="btn btn-outline-secondary my-3" to="/">
        Quay Lại
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={products.name} />
          <Row>
            <Col md={6}>
              <Image src={products.image} alt={products.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item className={classes.border}>
                  <h3 style={{ color: "#32FBE2" }}>{products.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className={classes.padding}>
                  <Rating
                    value={products.rating}
                    text={`${products.numReviews} đánh giá`}
                  />
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ paddingBottom: "14px" }}
                  className={classes.border}
                >
                  Giá: {products.price} VNĐ
                </ListGroup.Item>
                <ListGroup.Item className={classes.padding}>
                  <h5 style={{ color: "#32FBE2" }}>Mô Tả Sản Phẩm</h5>
                  {products.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Đơn Giá:</Col>
                      <Col>
                        <strong>{products.price} VNĐ</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tình Trạng:</Col>
                      <Col>
                        {products.countInStock > 0 ? "Còn Hàng" : "Hết Hàng"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {products.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Số Lượng</Col>
                        <Col>
                          <Form.Control
                            style={{ padding: "0.25rem 0.35rem" }}
                            className="form-select"
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(products.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="w-100"
                      type="button"
                      disabled={products.countInStock === 0}
                      onClick={AddToCartHandle}
                    >
                      Thêm Giỏ Hàng
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* REVIEWS */}
          <Row>
            <Col md={6}>
              <h2>Đánh Giá</h2>
              {products.reviews.length === 0 && (
                <Message>Chưa Có Đánh Giá</Message>
              )}
              <ListGroup variant="flush">
                {products.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p
                      className={classes.border}
                      style={{ paddingBottom: "27px" }}
                    >
                      {review.comment}
                    </p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Viết Đánh Giá Của Khách Hàng</h2>
                  {false && (
                    <Message variant="success"> Gửi Đánh Giá...</Message>
                  )}
                  {false && <Loader />}
                  {false && <Message variant="danger">OK</Message>}
                  {false ? (
                    <Form>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control className="form-select" as="select">
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value=""
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled
                        type="submit"
                        variant="primary"
                        className="mt-3"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Vui Lòng <Link to="/login">Đăng Nhập</Link> Để Viết Đánh Giá
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductDetailsScreen;
