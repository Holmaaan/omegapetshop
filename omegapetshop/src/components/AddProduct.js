import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        alert('Producto agregado exitosamente');
        navigate('/'); // Redirige a la página de inicio
    } else {
        const errorMessage = await response.text(); // Lee el mensaje de error del backend
        throw new Error(`Error al agregar el producto: ${errorMessage}`);throw new Error('Error al agregar el producto');
      }
    } catch (error) {
      console.error(error);
      alert('Error al agregar el producto');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Agregar Producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Imagen URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Agregar Producto</Button>
      </Form>
    </div>
  );
}

export default AddProduct;
