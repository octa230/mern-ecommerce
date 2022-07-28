import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import Rating from './Rating';


const Product = (props) => {
const { product } = props;
return (
<Card className ='product'>
            <Link to={`/product/${product.slug}`}>
            <img src ={product.image} alt={product.name} className="card-img-top"/>
            </Link>
    <Card.Body>
        <Link to={`/product/${product.slug}`}>
            <p>{product.name}</p>
            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            </Link>
            <Card.Title>AED: {product.price}</Card.Title>
            <Button>Add to Basket</Button>
    </Card.Body>
</Card>
)
}

export default Product
