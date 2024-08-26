import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Login from './components/Login';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import ProductForm from './components/ProductForm';
import { CartProvider } from './contexts/CartContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/App.css';

function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth(); // Usar el hook aquí
  return isAuthenticated ? element : <div>No autorizado</div>;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <div className="App">
              <NavbarComponent />
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/add-product" element={<PrivateRoute element={<ProductForm />} />} />
              </Routes>
            </div>
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
