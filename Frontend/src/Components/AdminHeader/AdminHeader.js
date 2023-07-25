import React from 'react';
import './AdminHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { getAuthUser, removeAuthUser } from '../../localStrorage/Strorage';
import axios from 'axios';


const AdminHeader = () => {
  const navigate = useNavigate();
  const auth = getAuthUser()

  const userName = auth.name;

  const AdminLogout = () => {

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
        <ul className='adminHeader-list'>
            <li className='hover-style'><Link to={"/adminMedsDashboard"}>Meds Dashboard</Link></li>
            <li className='hover-style'><Link to={"/orders"}>Orders</Link></li>
            <li className='hover-style'><Link to={"/patientList"}>Patients List</Link></li>
            <li className='hover-style'><Link to={"/categoryList"}>Categories List</Link></li>
        </ul>
          <Nav className='index'>
            <NavDropdown  title ={userName}>
                <NavDropdown.Item className='list-item' onClick={AdminLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        <img className='admin-pic' src='images/setting.png' alt=''/>
        <img className='admin-status-ico' src={'images/online.png'} alt=''/>
    </div>
  )
}

export default AdminHeader;