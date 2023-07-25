import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAuthUser } from '../localStrorage/Strorage';

function Admin() {
    const auth = getAuthUser();

  return (
    <>
        {
            (auth && auth.type == 'admin') ? <Outlet/> : <Navigate  to={'/'}/>
        }
        {
            (auth && auth.type == 'patient') &&(
                <Navigate to={'/patientMedsDashboard'}/>
            )
        }
        {
            !auth && (
                <Navigate to={'/'}/>
            )
        }
    </>
  )
}

export default Admin