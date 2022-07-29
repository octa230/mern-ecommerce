import React, { useContext } from 'react';
import axios from 'axios';
import { Store } from '../Store';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import Rating from './Rating';


const Product = (props) => {
const { product } = props;

const {state, dispatch: ctxDispatch } = useContext(Store);
const{
    cart: { cartItems },
} = state

const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
        window.alert('Sorry product is out of stock');
        return;
      }
      ctxDispatch({
      type:'CART_ADD_ITEM', 
      payload: {...item, quantity},
    });
};
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
            {product.countInStock === 0 ? (
            <Button variant='light' disabled>
                Out of Stock
            </Button>
            ):(
             <Button onClick={() => addToCartHandler(product)}>Add to Basket</Button>
            )
            }
    </Card.Body>
</Card>
)
}

export default Product
