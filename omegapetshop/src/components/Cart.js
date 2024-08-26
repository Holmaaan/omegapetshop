import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';

function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <Row>
          {cart.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text><strong>{product.price}</strong></Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Eliminar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Cart;
