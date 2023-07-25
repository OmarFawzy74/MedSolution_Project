import React, {useEffect, useState} from 'react'
import '../Orders/Orders.css'
import { Table } from 'reactstrap';
import axios from 'axios';
import { getAuthUser } from '../../localStrorage/Strorage';
import swal from 'sweetalert';
import Alert from 'react-bootstrap/Alert';


const Orders = () => {

  const auth = getAuthUser();

  const [orders, setOrders] = useState({
    loading: true,
    results: null,
    err: null,
    status: null,
    reload: 0
  });


  useEffect(() => {
      setOrders({...orders, loading: true})
      axios.get("http://localhost:4000/orders/admin", {
        headers: {
          token: auth.token
        }
      })
      .then(
          resp => {
              console.log(resp.data);
              setOrders({results: resp.data, loading: false, err: null});
          }
      ).catch(err => {
          setOrders({...orders, loading: false, err: err.response.data.errors});
      })
  }, [orders.reload]);


  const acceptOrder = (e) => {
    axios.post("http://localhost:4000/orders/submitStatus", {
      id: e.target.value,
      status: "accepted"
    },
    {
      headers: {
        token: auth.token
      }
    })
    .then((resp) => {
      swal(resp.data.msg,"","success");
      setOrders({...orders, reload: orders.reload + 1});
    })
    .catch((errors) => {
      swal(errors.response.data.errors[0].msg,"","error");
      console.log(errors);
    })
  }

  const declineOrder = (e) => {
    const orderId = e.target.value;
    axios.post("http://localhost:4000/orders/submitStatus", {
      id: orderId,
      status: "declined"
    },
    {
      headers: {
        token: auth.token
      }
    })
    .then((resp) => {
      swal(resp.data.msg,"","success");
      setOrders({...orders, reload: orders.reload + 1});
    })
    .catch((errors) => {
      swal(errors.response.data.errors[0].msg,"","error");
      console.log(errors);
    })
  }

    return (
      <>
        <section className='OrdersPage'>
          <div>
            <h1>Orders</h1>
          </div>
          {
            orders.loading == false && orders.err == null && (
              <div className='contain-table-2'>
                <Table striped>
                  <thead>
                    <tr>
                      <th colSpan={2} className='patient-name-header'>
                        Patient Name
                      </th>
                      <th colSpan={2}>
                        Email
                      </th>
                      <th colSpan={2} className='medicine-name-header'>
                        Medicine Name
                      </th>
                      <th colSpan={2}>
                        Price
                      </th>
                      <th colSpan={2} className='ol-action'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      orders.loading == false && orders.err == null && (
                        orders.results.map((order) => (
                          <tr>
                            <td colSpan={2}>
                              {order.name}
                            </td>
                            <td colSpan={2}>
                              {order.email}
                            </td>
                            <td colSpan={2}>
                              {order.medicine_name}
                            </td>
                            <td colSpan={2} className='price-contain'>
                              {
                                Number.isInteger(order.price) == true && (
                                  order.price + ".00 EGP"
                                )
                              }
                              {
                                Number.isInteger(order.price) == false && (
                                  order.price + " EGP"
                                )
                              }
                            </td>
                            <td colSpan={2} className="btns-contain">
                              {
                                orders.loading == false && orders.err == null && order.status == 'pending' && (
                                  <>
                                    <button value={order.id} onClick={acceptOrder} className="button muted-button accept-btn">
                                    Accept
                                    </button>
                                    <button value={order.id} onClick={declineOrder} className="button muted-button decline-btn">
                                    Decline
                                    </button>
                                  </>
                                )
                              }
                              {
                                orders.loading == false && orders.err == null && order.status != 'pending' && (
                                  <span className='Status'>{order.status}</span>
                                )
                              }
                            </td>
                          </tr>
                        ))
                      )
                    }
                  </tbody>
                </Table>
              </div>
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
  
        </section>
      </>
    )
  }

export default Orders;
