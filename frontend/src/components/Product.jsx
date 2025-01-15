// for one product card
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";


const Product = ({ product }) => {
  // console.log(product);

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/productinfo/${product._id}`}>
        <Card.Img src={`http://localhost:5000${product.image}`} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
            
          </Card.Title>
          <Card.Title as="div" className="product-title">
            <Rating value={product.rating}/>
            

          </Card.Title>
        </Link>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
