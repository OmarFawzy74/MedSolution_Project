import React, {useEffect, useState} from 'react'
import './PatientOrdersList.css'
import { Table} from 'reactstrap';
import axios from 'axios';
import { getAuthUser } from '../../localStrorage/Strorage';
import Alert from 'react-bootstrap/Alert';

const PatientOrdersList = () => {

  const [orders, setOrders] = useState({
    loading: true,
    user_id: "",
    results: [],
    err: null,
    reload: 0
  });

  const auth = getAuthUser();

  useEffect(() => {
      const user_id = auth.id
      setOrders({...orders, loading: true, user_id: user_id})
      // console.log(orders.user_id);
      axios.get("http://localhost:4000/orders/patient", {
        params: {
          id: user_id
        },
        headers: {
          token: auth.token
        }
      })
      .then(
          resp => {
              console.log(resp.data);
              setOrders({results: resp.data, loading: false, err: null});
          }
      ).catch(error => {
          setOrders({...orders, loading: false, err: error.response.data.errors});
          console.log(error.response.data.errors[0].msg);
      })
  }, []);


    return (
      <>
        <section className='patient-orders-page'>
          <div>
            <h1>Orders List</h1>
          </div>
          <div className='contain-table'>
            {

              orders.loading == false && orders.err == null &&(
                <Table striped>
                  <thead>
                    <tr>
                      <th>
                        Medicine Name
                      </th>
                      <th>
                        Price
                      </th>
                      <th className='status'>
                        Order Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.loading == false && orders.err == null && (
                        orders.results.map((order) => (
                          <tr>
                            <td>
                              {order.medicine_name}
                            </td>
                            <td>
                              {order.price} EGP
                            </td>
                            <td className="status-content">
                              {order.status}
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
              orders.loading == false && orders.err !== null &&(
                orders.err.map((error, index) => (
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

export default PatientOrdersList;
