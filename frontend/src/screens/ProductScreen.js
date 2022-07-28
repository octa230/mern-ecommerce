import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useReducer } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Rating from '../components/Rating';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { Helmet } from 'react-helmet-async';
import { getError } from '../utils';


const reducer =(state, action) =>{

  switch(action.type) {
    case 'FETCH REQUEST':
      return {...state, loading: true};
      case 'FETCH_SUCCESS':
        return{...state, product: action.payload, loading:false};
        case 'FETCH_FAIL':
          return{...state, loading: false, error: action.payload };
          default:
            return state;
  }
}


const ProductScreen = () => {

  const params = useParams();
  const {slug} = params

  const [{ loading, error, product}, dispatch] = useReducer(reducer, {
    product: [],
    loading: true, 
    error: '',
  });

  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async() =>{
      dispatch({type: 'FETCH_REQUEST'});
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({type: 'FETCH_SUCCESS', payload: result.data})
      } catch(err){
        dispatch({type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
   
  return  loading ?(
    <LoadingBox />
    ) : error ? (
      <MessageBox variant='danger'>{error}</MessageBox>
    ) : (
      <div>
        <Row>
          <Col md={6}>
            <img className='img-large'
            src={product.image}
            alt={product.name}
            ></img>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating 
                rating={product.rating}
                numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>AED: {product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>AED: {product.price }</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                      {product.countInStock > 0 ? (<Badge bg='success'>Available</Badge>
                      ) : ( <Badge bg='danger'>Not in Stock Now</Badge>)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <div className='d-grid'>
                      <Button variant='primary'>Add to Basket</Button>
                      </div>
                      
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </div>
    );
}

export default ProductScreen
