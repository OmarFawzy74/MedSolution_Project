import React, {useEffect, useState} from 'react'
import './PatientList.css';
import { Table} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../localStrorage/Strorage';

const PatientList = () => {

  const auth = getAuthUser();
  
  const [patients, setPatients] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
  });


  useEffect(() => {
      setPatients({...patients, loading: true})
      axios.get("http://localhost:4000/patients", {
        headers: {
          token: auth.token
        }
      })
      .then(
          resp => {
              console.log(resp.data);
              setPatients({results: resp.data, loading: false, err: null});
          }
      ).catch(err => {
          setPatients({...patients, loading: false, err: err.response.data.errors});
      })
  }, [patients.reload]);

  const deletePatient = (e) => {
    e.preventDefault();
    const patient_id = e.target.value;
    axios.delete("http://localhost:4000/patients", {
        params: {
            id: patient_id
        },
        headers : {
          token: auth.token
        }
    })
    .then(
        resp => {
            swal(resp.data.msg,"","success");
            setPatients({...patients, reload: patients.reload + 1});
        }
    ).catch(error => {
        console.log(error);
    })
  }

  

  return (
    <>
      <section className='patientListPage'>
        <div>
          <h1>Patient List</h1>
        </div>
        <div className='contain-table'>
          <Link to={'/addPatient'}>
            <button className='addPatientButton'>
              Add Patient
            </button>
          </Link>
          {
            patients.loading == false && patients.err == null &&(
            <Table striped>
              <thead>
                <tr>
                  <th>
                    Name
                  </th>
                  <th>
                    Email
                  </th>
                  <th>
                    Phone
                  </th>
                  <th className='oh'>
                    Status
                  </th>
                  <th className='pl-action'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                { 
                  patients.loading == false && patients.err == null && (
                    patients.results.map((patient) => (
                      <tr>
                        <td>
                          {patient.name}
                        </td>
                        <td>
                          {patient.email}
                        </td>
                        <td>
                          {patient.phone}
                        </td>
                        <td>
                          {patient.status}
                        </td>
                        <td colSpan={2} className='btns-contain'>
                          <Link to={'/updatePatient/' + patient.id}>
                            <button className="button muted-button pl-update-btn">
                              Update
                            </button>
                          </Link>
                          <button value={patient.id} onClick={deletePatient} className="button muted-button pl-delete-btn">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </Table>
            )
          }
          {   
            patients.loading == false && patients.err !== null &&(
              patients.err.map((error, index) => (
                <Alert key={index} variant={'danger'} className='err-msg-custom'>
                  {error.msg}
                </Alert>
              ))
            )
          }

        </div>

      </section>
    </>
  )
}

export default PatientList;