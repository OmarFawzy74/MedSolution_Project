import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import swal from 'sweetalert';
import './MedsCards.css'
import axios from 'axios';
import { getAuthUser } from '../../localStrorage/Strorage';



export const MedsCards = (props) => {

    const addOrder = (e) => {
        e.preventDefault();

        const auth = getAuthUser();
        
        const Data = {
            medicineId: e.target.value,
            patientId: auth.id
        }
        
        axios.post("http://localhost:4000/orders", {
            medicine_id: Data.medicineId,
            patient_id: Data.patientId
        },
        {
            headers: {
                token: auth.token
            }
        })
        .then(
            resp => {
                swal(resp.data.msg,"","success");
            }
        ).catch(errors => {
            console.log(errors.response.data.errors);
            swal(errors.response.data.errors[0].msg,"","error");
        });
    }


  return (
    <Card className='product-card' style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.image}/>
        <Card.Body>
            <Card.Title className='product-name'>{props.name}</Card.Title>
            <Card.Text>
                {props.description}
            </Card.Text>
            <Card.Text className='product-exp-date'>
                EXP.Date : {props.exp_date}
            </Card.Text>
            <Card.Text className='product-price'>
                {
                    Number.isInteger(props.price) == true && (
                        props.price + ".00 EGP"
                    )
                }
                {
                    Number.isInteger(props.price) == false && (
                        props.price + " EGP"
                    )
                }
            </Card.Text>
            <hr/>
            <Button value={props.id} className='order-btn' onClick={addOrder}>Order now</Button>
        </Card.Body>
    </Card>
  )
}

// const order = () => {
//     swal("Order Requested Successfully","","success");
// }

export default MedsCards;