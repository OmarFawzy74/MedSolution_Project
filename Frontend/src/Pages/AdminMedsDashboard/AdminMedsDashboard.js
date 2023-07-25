import React, {useEffect, useState} from 'react'
import './AdminMedsDashboard.css'
import swal from 'sweetalert';
import {Link} from "react-router-dom";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { getAuthUser } from '../../localStrorage/Strorage';


const AdminMedsDashboard = () => {

    const auth = getAuthUser();
    
    const [meds, setMeds] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });


    useEffect(() => {
        setMeds({...meds, loading: true})
        axios.get("http://localhost:4000/meds", {
            headers: {
                token: auth.token
            }
        })
        .then(
            resp => {
                console.log(resp.data);

                setMeds({results: resp.data, loading: false, err: null})
            }
        ).catch(err => {
            setMeds({...meds, loading: false, err: "something went wrong"})
        })
    }, [meds.reload]);


    const deleteMedicine = (e) => {
        e.preventDefault();
        const medicine_id = e.target.value;

        axios.delete("http://localhost:4000/meds", {
            params: {
                id: medicine_id
            },
            headers : {
                token: auth.token
            }
        })
        .then(
            resp => {
                swal(resp.data.msg,"","success");
                setMeds({...meds, reload: meds.reload + 1});
            }
        ).catch(error => {
            console.log(error);
        })
    }


  return (
    <>
        <section className='MedsPage'>
            <div className='patient-meds-header'>
                <h1>Meds Dashboard</h1>
            </div>

            <Link to={'/addMedicine'}>
                <button className='add-medicine-btn'>
                    Add Medicine
                </button>
            </Link>

            {
                meds.loading === true && (
                    <Spinner className='load-ico-admin-page' animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )
            }
        </section>
        {
            meds.loading === false && meds.err === null && (

            <section className='products'>
                <div className='products-container'>
                {
                    meds.results.map((medicine) => (
                        <div key={medicine.id}>
                            <Card className='product-card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={medicine.image_url}/>
                                <Card.Body>
                                    <Card.Title className='product-name'>{medicine.name}</Card.Title>
                                    <Card.Text>
                                        {medicine.description}
                                    </Card.Text>
                                    <Card.Text className='product-exp-date'>
                                        EXP.Date : {medicine.exp_date}
                                    </Card.Text>
                                    <Card.Text className='product-price'>
                                        {
                                            Number.isInteger(medicine.price) == true && (
                                                medicine.price + ".00 EGP"
                                            )
                                        }
                                        {
                                            Number.isInteger(medicine.price) == false && (
                                                medicine.price + " EGP"
                                            )
                                        }
                                    </Card.Text>
                                    <hr/>
                                    <div className='btns-container'>
                                        <Link to={'/updateMedicine/' + medicine.id}>
                                            <button className='update-btn'>Update</button>
                                        </Link>
                                        <button value={medicine.id} className='delete-btn' onClick={deleteMedicine}>Delete</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
                </div>
            </section>
            )
        }

        {
            meds.loading === false && meds.err !== null && (
                <Alert variant={'danger'} className='err-msg-custom-2'>
                    something went wrong in loading medicines, please try again later 
                </Alert>
            )
        }

        {
            meds.loading === false && meds.err == null && meds.results.length == 0 && (
                <Alert variant={'danger'} className='err-msg-custom-2'>
                    no medicines found
                </Alert>
            )
        }
    </>
  );
}

export default AdminMedsDashboard;