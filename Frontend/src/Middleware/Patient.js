import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAuthUser } from '../localStrorage/Strorage';

function Patient() {
    const auth = getAuthUser();

    return (
        <>
            {
                (auth && auth.type == 'patient') ? <Outlet/> : <Navigate  to={'/'}/>
            }
            {
                (auth && auth.type == 'admin') &&(
                    <Navigate to={'/adminMedsDashboard'}/>
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

export default Patient