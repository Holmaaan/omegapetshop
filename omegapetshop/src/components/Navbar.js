import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Importar el hook del carrito
import { useAuth } from '../contexts/AuthContext'; // Importar el hook de autenticación

function NavbarComponent() {
  const { getCartCount } = useCart(); // Obtener el conteo del carrito
  const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">OmegaPetShop</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
        <Nav.Link as={Link} to="/register">Registro</Nav.Link>
        <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
        {isAuthenticated && <Nav.Link as={Link} to="/add-product">Agregar Producto</Nav.Link>} {/* Mostrar solo si está autenticado */}
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/cart">
          Carrito ({getCartCount()})
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
