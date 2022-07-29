import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ProductScreen from "./screens/ProductScreen";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import Nav from 'react-bootstrap/Nav'
import { useContext } from 'react';
import { Store } from './Store'


function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>   
      <header>
        <Navbar bg='dark' variant="dark">
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>Logo</Navbar.Brand>
            </LinkContainer>
            <Nav className='me-auto'>
              <Link to='/cart' className='nav-link'>
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg='danger'>
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
        <Routes>
          <Route path="/cart" element={<CartScreen />} />   
          <Route path="/signin" element={<SigninScreen />} />   

          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/" element={<HomeScreen />} />        
        </Routes>
        </Container>
      </main>
      <footer>
        <div>All rights reserved </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
