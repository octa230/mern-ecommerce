import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';


function App() {
  return (
    <BrowserRouter>   
      <header>
        <Navbar bg='dark' variant="dark">
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>Logo</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
        <Routes>
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
