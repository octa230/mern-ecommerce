import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import { Store } from '../Store'


export default function PlaceOrderScreen() {

    const navigate = useNavigate()
    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {cart, UserInfo } = state;


    //BILLING FUNCTIONS

const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100 //123.2345 =>123.23
cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a+ c.quantity * c.price, 0)
);
cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)
cart.taxPrice = round2(0.15 * cart.itemsPrice);
cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


    const placeOrderHandler = async () =>{};
    
    useEffect(() => {
        if(!cart.paymentMethod){
            navigate('/payment');
        }
    }, [cart, navigate])

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className='my-3'>Preview Order</h1>
      <Row>
        <Col md={8}>
            <Card className='mb-3'>
                <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                    <Card.Text>
                        <strong>Name:-</strong> {cart.shippingAddress.fullName} <br />
                        <strong>Address:-</strong> {cart.shippingAddress.address},
                        {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                        {cart.shippingAddress.city},{cart.shippingAddress.country}
                    </Card.Text>
                    <Link to='/shipping'>Edit</Link>
                </Card.Body>
            </Card>
            <Card className='mb-3'>
                <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                        <strong>Method:-</strong> {cart.paymentMethod}
                    </Card.Text>
                    <Link to='/payment'>Edit</Link>
                </Card.Body>
            </Card>
            <Card className='mb-3'>
                <Card.Body>
                    <Card.Title>Items</Card.Title>
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item) =>(
                            <ListGroup.Item>
                                <Row className='align-items-center'>
                                    <Col md={6}>
                                        <img src={item.image} alt={item.name} className='img-fluid rounded img-thumbnail'></img>{' '}
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={3}>
                                        <span>{item.quantity}</span>
                                    </Col>
                                    <Col md={3}>
                                        <span>{item.price}</span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Link to='/cart'>Edit</Link>
                </Card.Body>
            </Card>
        </Col>
        <Col md={4}>
            <Card>
                <Card.Body>
                    <Card.Title>Order Summary</Card.Title>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>AED{cart.itemsPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>AED{cart.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>AED{cart.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                <strong>Order Total</strong>
                                </Col>
                                <Col>AED{cart.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <ListGroup.Item>
                                <div className='d-grid'>
                                    <Button
                                     type='button'
                                     onClick={placeOrderHandler}
                                     disabled={cart.cartItems.length === 0}
                                     >
                                        Place Order
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </div>
  )
}