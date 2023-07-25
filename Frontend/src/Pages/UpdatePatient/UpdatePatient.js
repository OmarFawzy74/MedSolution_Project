import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../localStrorage/Strorage';

const UpdatePatient = () => {

    const[patient, setPatient] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        loading: false,
        err: null
    });

    let {id} = useParams();

    const auth = getAuthUser();


    useEffect(() => {
        setPatient({...patient, loading: true})
        axios.get("http://localhost:4000/patients", {
            params : {
                id: id
            },
            headers: {
                token: auth.token
            }
        })
        .then(
            resp => {
                console.log(resp.data);
                setPatient({...patient, name: resp.data[0].name, email: resp.data[0].email, phone: resp.data[0].phone, loading: false, err: null});
            }
        ).catch(err => {
            setPatient({...patient, loading: false, err: err});
        })
    }, []);

    
      const updatePatient = (e) => {
        e.preventDefault();
        setPatient({...patient, loading: true, err: null});
        axios.put("http://localhost:4000/patients/" + id, {
            name: patient.name,
            email: patient.email,
            password: patient.password,
            phone: patient.phone
        },
        {
            headers: {
                token : auth.token
            },
        })
        .then((resp) => {
            setPatient({...patient, name: "", email: "", phone: "", password:"", loading: false, err: null});
            swal(resp.data.msg,"","success");
        })
        .catch((errors) => {
            setPatient({...patient, loading: false, err: errors.response.data.errors});
            console.log(errors);
        })
    }


    return (
        <>
            <section className='AddPatientPage'>
                <div>
                    <h1>Update Patient</h1>
                </div>
            </section>

            {   
                patient.loading == false && patient.err !== null &&(
                    patient.err.map((error, index) => (
                        <Alert key={index} variant={'danger'} className='err-msg-5'>
                            {error.msg}
                        </Alert>
                    ))
                )
            }

            <section className='AddPatient'>
                <form onSubmit={updatePatient}>
                    <div className='form-control'>
                        <h2>Name</h2>
                        <input
                        placeholder='Enter Name'
                        // required
                        value={patient.name}
                        onChange={(e) => setPatient({...patient, name: e.target.value})}
                        />
                    </div>
                    <div className='form-control'>
                        <h2>Email</h2>
                        <input
                        type='email'
                        placeholder='Enter Email'
                        // required
                        value={patient.email}
                        onChange={(e) => setPatient({...patient, email: e.target.value})}
                        />
                    </div>
                    <div className='form-control'>
                        <h2>Password</h2>
                        <input 
                        type='password'
                        placeholder='Enter Password'
                        // required
                        value={patient.password}
                        onChange={(e) => setPatient({...patient, password: e.target.value})}
                        />
                    </div>
                    <div className='form-control'>
                        <h2 className='pn'>Phone Number</h2>
                        <input 
                        // required
                        value={patient.phone}
                        onChange={(e) => setPatient({...patient, phone: e.target.value})}
                        placeholder='Enter Phone Number'
                        />
                    </div>
                    
                    <div className='btn-container'>
                        <button type='submit' className='add-button'>Update</button>
                        <Link to={'/patientList'}><button className='cancel-button'>Cancel</button></Link>
                    </div>
                </form>
            </section>
        </>
    )
}

export default UpdatePatient;