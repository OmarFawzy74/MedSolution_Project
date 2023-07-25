import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAuthUser } from '../localStrorage/Strorage';

function Authenticated() {
    const auth = getAuthUser();

  return (
    <>
        {
            (auth && auth.type == 'admin') ? <Navigate  to={'/adminMedsDashboard'}/> : <Outlet/>
        }
        {
            auth && auth.type == 'patient' &&(
                <Navigate  to={'/patientMedsDashboard'}/>
            )
        }
    </>
  )
}

export default Authenticated