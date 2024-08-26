import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required('El nombre de usuario es obligatorio'),
  email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Registro exitoso');
        navigate('/login'); // Redirige al inicio de sesión
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }
    } catch (error) {
      console.error(error);
      alert('Error en el registro');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registro</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <Form.Group controlId="formUsername">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control type="text" {...register('username')} isInvalid={!!errors.username} />
          <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" {...register('email')} isInvalid={!!errors.email} />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" {...register('password')} isInvalid={!!errors.password} />
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="submit" className="mt-3">Registrarse</Button>
      </Form>
    </div>
  );
}

export default Register;
