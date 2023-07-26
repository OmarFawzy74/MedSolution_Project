import React, {useEffect, useState} from 'react'
import '../CategoryList/CategoryList.css'
import { Table} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { getAuthUser } from '../../localStrorage/Strorage';
import './SearchHistory.css'
import Alert from 'react-bootstrap/Alert';

const SearchHistory = () => {

    const auth = getAuthUser();

    const [Searches, setSearches] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });

    useEffect(() => {
            setSearches({...Searches, loading: true})
            axios.get("https://sangria-python-toga.cyclic.app/patients/searches", {
                params: {
                    id: auth.id
                },
                headers: {
                  token: auth.token
                }
            })
            .then(
            resp => {
                console.log(resp.data);
                setSearches({results: resp.data, loading: false, err: null});
            }
            ).catch(err => {
                setSearches({...Searches, loading: false, err: err.response.data.errors});
            })
        }, []);

    return (
      <>
        <section className='CategoryListPage'>
          <div>
            <h1>Search History</h1>
          </div>
          <div className='sh-contain-table'>
            {

              Searches.loading == false && Searches.err == null &&(
                <Table striped>
                  <thead>
                    <tr>
                      <th colSpan={2} className='action'>
                        Searches
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Searches.loading == false && Searches.err == null && (
                        Searches.results.map((Search => (
                          <tr>
                            <td className="test" colSpan={2}>
                                {Search.search_query}
                            </td>
                          </tr>
                        )))
                      )
                    }
                  </tbody>
                </Table>
              )
            }
            {   
              Searches.loading == false && Searches.err !== null &&(
                Searches.err.map((error, index) => (
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

export default SearchHistory;
