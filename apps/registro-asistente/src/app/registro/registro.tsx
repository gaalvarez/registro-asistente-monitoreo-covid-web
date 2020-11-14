import React, { ReactNode } from 'react';

import { Form, Button, Col, Alert } from 'react-bootstrap';

import './registro.scss';

import { Formik, Field } from 'formik';
import { environment } from '../../environments/environment.prod';

/* eslint-disable-next-line */
export interface RegistroProps {}
export interface RegistroState {
  eventos: any[];
  registro: any;
  mostrarMensaje: boolean;
}

export class Registro extends React.Component<RegistroProps, RegistroState> {
  constructor(props) {
    super(props);
  }

  state = {
    eventos: [],
    registro: {},
    mostrarMensaje: false,
  };

  componentDidMount() {
    fetch(`${environment.urlBackend}/registros/eventos`)
      .then((response) => {
        return response.json();
      })
      .then((eventos) => {
        console.log(eventos);
        this.setState({ eventos });
      });
  }

  formSubmit = (registro) => {
    console.log(registro);
    fetch(`${environment.urlBackend}/registros`, {
      method: 'post',
      body: JSON.stringify(registro),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((eventos) => {
        console.log(eventos);
        if (eventos.idAsistenteEvento) {
          this.setState({ mostrarMensaje: true });
        } else {
          this.setState({ mostrarMensaje: false });
        }
      })
      .catch((error) => {
        alert(error);
        this.setState({ mostrarMensaje: false });
      });
  };

  render() {
    return (
      <div className="app">
        <header className="flex">
          {/* <Logo width="75" height="75" /> */}
          <h1>Bienvenido a Monitoreo-Covid App</h1>
        </header>
        <main>
          <h2>Llene los siguientes datos</h2>
          <Formik
            onSubmit={this.formSubmit}
            initialValues={{
              idEvento: '',
              nombres: '',
              apellidos: '',
              correo: '',
              numeroCelular: '',
              numeroIdentificacion: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="groupEvento">
                  <Form.Label>Custom select</Form.Label>
                  <Form.Control
                    as="select"
                    name="idEvento"
                    value={values.idEvento}
                    onChange={handleChange}
                    isValid={touched.idEvento && !errors.idEvento}
                    isInvalid={!!errors.idEvento}
                  >
                    <option value="" disabled>
                      Seleccione...
                    </option>
                    {this.state.eventos.map((evento) => {
                      return (
                        <option key={evento.idEvento} value={evento.idEvento}>
                          {evento.nombre}
                        </option>
                      );
                    })}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.idEvento}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="grupoNombres">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombres"
                      value={values.nombres}
                      onChange={handleChange}
                      isValid={touched.nombres && !errors.nombres}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="grupoApellidos">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      name="apellidos"
                      value={values.apellidos}
                      onChange={handleChange}
                      isValid={touched.apellidos && !errors.apellidos}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="grupoCorreo">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="correo"
                      placeholder="example@example.edu.co"
                      value={values.correo}
                      onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                      Con éste correo nos mantendremos en contacto
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="grupoNumeroCelular">
                    <Form.Label>Número de celular</Form.Label>
                    <Form.Control
                      type="text"
                      name="numeroCelular"
                      value={values.numeroCelular}
                      onChange={handleChange}
                      isValid={touched.numeroCelular && !errors.numeroCelular}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="grupoCorreo">
                  <Form.Label>Número de identificación</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroIdentificacion"
                    value={values.numeroIdentificacion}
                    onChange={handleChange}
                    isValid={
                      touched.numeroIdentificacion &&
                      !errors.numeroIdentificacion
                    }
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Registrar
                </Button>
              </Form>
            )}
          </Formik>
          {this.state.mostrarMensaje ? (
            <Alert variant="success">
              <Alert.Heading>Correcto</Alert.Heading>
              <p className="mb-0">El registor ha sido exitoso</p>
            </Alert>
          ) : null}
        </main>
      </div>
    );
  }
}

export default Registro;
