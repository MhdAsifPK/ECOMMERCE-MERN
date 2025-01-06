import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import products from "../../products.js";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product, i) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={i}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
