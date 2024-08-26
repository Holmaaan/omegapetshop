import React, { useEffect } from 'react';
import { Card, Button, Col, Row, Carousel } from 'react-bootstrap';
import { useProducts } from '../contexts/ProductsContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext'; // Importar el hook de autenticación

function ProductList() {
  const { products, fetchProducts } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación

  useEffect(() => {
    fetchProducts(); // Cargar productos cuando se monte el componente
  }, [fetchProducts]);

  const openProductDetails = (productId) => {
    window.open(`/product/${productId}`, '_blank');
  };

  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      addToCart(product); // Agregar al carrito si está autenticado
    } else {
      alert('Debes estar registrado para agregar productos al carrito.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Productos para Perro</h2>
      
      {/* Carrusel de Promociones */}
      <Carousel className="mb-4">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.nestle.com.ar/sites/g/files/pydnoa481/files/Banner%20Pro%20Plan.jpg"
            alt="Promoción 1"
          />
          <Carousel.Caption>
            <h3>Promoción 1</h3>
            <p>Descripción de la promoción 1.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.purinaspain.es/promociones/images/es-ng/banner-club-proplan-v3.jpg"
            alt="Promoción 2"
          />
          <Carousel.Caption>
            <h3>Promoción 2</h3>
            <p>Descripción de la promoción 2.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.purinaspain.es/promociones/images/es-ng/banner-purina-pro-plan-promo-ruleta.jpg"
            alt="Promoción 3"
          />
          <Carousel.Caption>
            <h3>Promoción 3</h3>
            <p>Descripción de la promoción 3.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Row>
        {products.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>{product.price}</strong></Card.Text>
                <Button variant="primary" onClick={() => openProductDetails(product.id)}>Comprar</Button>
                <Button className="add-to-cart-btn mt-2" onClick={() => handleAddToCart(product)}>
                  <i className="bi bi-cart-plus"></i> Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductList;
