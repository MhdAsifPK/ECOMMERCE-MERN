import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
// import products from "../../products.js";
// import ProductScreen from "./ProductScreen.jsx";
import { useGetProductsQuery } from "../slices/productApiSlice.js";
import Loader from "../components/Loader.jsx";

const HomeScreen = () => {
  const { data: products,isLoading,error } = useGetProductsQuery();
  console.log(products)
  return (
    <>
 {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.data.message}</div>
      ) :(
        <>
        
      <h1>Latest Product</h1>
      <Row>
        {products&&products.map((product, i) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={i}>
              <Product product={product} />
            </Col>
          );
        })}

        {/* <ProductScreen  /> */}
      </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
