// for one product card
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  console.log(product);

  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/productinfo/${product.id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>
      <Card.Body>
        <a href={`/product/${product.id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
