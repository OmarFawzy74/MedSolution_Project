import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { getAuthUser, setAuthUser } from '../../localStrorage/Strorage';


const Login = () => {

  const navigate = useNavigate();

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const AdminLoginHandleClose = () => setShowAdminLogin(false);
  const AdminLoginHandleShow = () => setShowAdminLogin(true);

  const [showPatientLogin, setShowPatientLogin] = useState(false);

  const PatientLoginHandleClose = () => setShowPatientLogin(false);
  const PatientLoginHandleShow = () => setShowPatientLogin(true);

  const[adminLogin, setAdminLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: []
  });

  const adminLoginFun = (e) => {
    e.preventDefault();
    setAdminLogin({...adminLogin, loading: true, err: []});
    axios.post("http://localhost:4000/auth/login", {
      email: adminLogin.email,
      password: adminLogin.password,
      type: 'admin'
    })
    .then((resp) => {
      setAdminLogin({...adminLogin, loading: false, err: []});
      setAuthUser(resp.data);
      navigate("/adminMedsDashboard");
    })
    .catch((errors) => {
      swal(errors.response.data.errors[0].msg,"","error");
      setAdminLogin({...adminLogin, loading: false, err: errors.response.data.errors});
    })
  }


  const[patientLogin, setPatientLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: []
  });


  const patientLoginFun = (e) => {
    e.preventDefault();
    setPatientLogin({...patientLogin, loading: true, err: []});
    axios.post("http://localhost:4000/auth/login", {
      email: patientLogin.email,
      password: patientLogin.password,
      type: 'patient'
    })
    .then((resp) => {
      setPatientLogin({...patientLogin, loading: false, err: []});
      setAuthUser(resp.data);
      navigate("/patientMedsDashboard");
    })
    .catch((errors) => {
      swal(errors.response.data.errors[0].msg,"","error");
      setPatientLogin({...patientLogin, loading: false, err: errors.response.data.errors});
    })
  }


  return (
    <>
      <section className='login-section'>
        <div className='icons-container'>
            <div className='patient-ico' onClick={PatientLoginHandleShow}>
                <img src='images/patient.png'/>
                <h6>Patient</h6>
            </div>
            <div className='admin-ico' onClick={AdminLoginHandleShow}>
                <img src='images/setting.png'/>
                <h6>Admin</h6>
            </div>
        </div>
      </section>

      <Modal show={showAdminLogin} onHide={AdminLoginHandleClose}>
        <Modal.Header closeButton className='Header'>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='login-form' onSubmit={adminLoginFun}>
            <Form.Group className="mb-3 g-1" controlId="exampleForm.ControlInput1">
              <Form.Label className='email-header'>Email address</Form.Label>
              <Form.Control
                className='email-input'
                required
                type="email"
                value={adminLogin.email}
                onChange={(e) => setAdminLogin({...adminLogin, email: e.target.value})}
                placeholder="Enter Email"
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                value={adminLogin.password}
                onChange={(e) => setAdminLogin({...adminLogin, password: e.target.value})}
                className='pass-input' 
                type="password"
                placeholder="Enter Password"
              />
            </Form.Group>

            <div className='line-container'>
              <hr className='login-form-line'/>
            </div>

            <Form.Group
            className="mb-3 login-btn-container">
              <Button type='submit' className='login-btn' onClick={AdminLoginHandleShow}>
                Login
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showPatientLogin} onHide={PatientLoginHandleClose}>
        <Modal.Header closeButton className='Header'>
          <Modal.Title>Patient Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='login-form' onSubmit={patientLoginFun}>
            <Form.Group className="mb-3 g-1" controlId="exampleForm.ControlInput1">
              <Form.Label className='email-header'>Email address</Form.Label>
              <Form.Control
                className='email-input'
                type="email"
                required
                placeholder="Enter Email"
                value={patientLogin.email}
                onChange={(e) => setPatientLogin({...patientLogin, email: e.target.value})}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
              className='pass-input' 
              type="password"
              required
              value={patientLogin.password}
              onChange={(e) => setPatientLogin({...patientLogin, password: e.target.value})}
              placeholder="Enter Password"/>
            </Form.Group>

            <div className='line-container'>
              <hr className='login-form-line'/>
            </div>

            <Form.Group
            className="mb-3 login-btn-container">
              <Button type='submit' className='login-btn' onClick={PatientLoginHandleShow}>
                Login
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;