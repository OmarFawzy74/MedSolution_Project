import React from 'react';
import './PatientHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthUser, removeAuthUser } from '../../localStrorage/Strorage';
import axios from 'axios';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

const PatientHeader = () => {

  const auth = getAuthUser()
  const userName = auth.name;
  const navigate = useNavigate();
  
  const PatientLogout = () => {
    const auth = getAuthUser();
    const user_id = auth.id;
    
    axios.post("http://localhost:4000/auth/logout", {
      id: user_id
    })
    .then((resp) => {
      console.log(resp.data.msg);
      removeAuthUser();
      navigate("/login");
    })
    .catch((errors) => {
      console.log(errors.response.data.errors[0].msg);
    })
  }

  return (
    <div className='header'>
        <img src={"../images/MedSolution4.png"} className='logo'/>
        <ul className='patient-header-list'>
            <li className='hover-style'><Link to={"/patientMedsDashboard"}>MedsDashboard</Link></li>
            <li className='hover-style'><Link to={"/patientOrdersList"}>Orders List</Link></li>
            <li className='hover-style'><Link to={"/searchHistory"}>Search History</Link></li>
            {/* <li className='hover-style'><a className='logout-btn' onClick={PatientLogout}>Logout</a></li> */}
        </ul>
        <Nav className='index-2'>
          <NavDropdown  title ={userName}>
            <NavDropdown.Item className='list-item' onClick={PatientLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <img className='patient-pic' src='images/patient.png' alt=''/>
        <img className='patient-status-ico' src={'images/online.png'} alt=''/>
    </div>
  )
}

export default PatientHeader;
