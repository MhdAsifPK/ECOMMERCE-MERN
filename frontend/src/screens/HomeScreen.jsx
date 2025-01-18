import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
// import products from "../../products.js";
// import ProductScreen from "./ProductScreen.jsx";
import { useGetProductsQuery } from "../slices/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";

const HomeScreen = () => {
  const {pageNumber,keyword}=useParams()
  // console.log(pageNumber)
  const { data,isLoading,error } = useGetProductsQuery({pageNumber,keyword});
  // console.log(products)
  return (
    <>
 {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error?.data?.message}</div>
      ) :(
        <>
        
      <h1>Latest Product</h1>
      <Row>
        {data.products&&data.products.map((product, i) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={i}>
              <Product product={product} />
            </Col>
          );
        })}

        {/* <ProductScreen  /> */}
      </Row>
      <Paginate pages={data.pages} page={data.page} keyword={keyword}/>
        </>
      )}
    </>
  );
};

export default HomeScreen;
