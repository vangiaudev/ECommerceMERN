
import Loader from "components/Loader";
import Message from "components/Message";
import Product from "components/Product";
import ProductBanner from "components/ProductBanner";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "redux/Actions/ProductActions";

const HomeScreen = () => {
  // const [products, setProducts] = useState([])
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    // const fetchAllProduct = async () => {
    //   const {data} = await axios.get("/api/products")
    //   setProducts(data)
    // }
    // fetchAllProduct()
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <div>
      <img
        src="http://file.hstatic.net/1000283722/collection/banner_web_desktop_nam__1__c7a28c6a722b453bb7ce2e02ae4934b9.jpg"
        alt="coverPicture"
        width="100%"
        style={{
          marginBottom: "1rem",
          borderBottom: "3px double #6F42C1",
          paddingBottom: "1rem",
        }}
      />
      <ProductBanner />
      <h1
        style={{
          width: "100%",
          color: "#EA39B8",
          fontSize: "20px",
          border: "4px solid #EA39B8",
          padding: "7px",
          borderRadius: "1p0x",
          letterSpacing: "1px",
          textAlign: "center",
        }}
      >
        Sản Phẩm Bán Chạy
      </h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products.length === 0 && (
            <h1 style={{ textAlign: "center" }}>
              😵 ❌ No Products Found ❌ 😵
            </h1>
          )}
          <Row>
            {products.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
