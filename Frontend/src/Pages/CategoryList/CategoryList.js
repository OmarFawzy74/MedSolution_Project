import React, {useEffect, useState} from 'react'
import '../CategoryList/CategoryList.css'
import { Table} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../localStrorage/Strorage';

const CategoryList = () => {

  const auth = getAuthUser();

  const [categories, setCategories] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
  });

  // http://localhost:4000/categories

  useEffect(() => {
      setCategories({...categories, loading: true})
      axios.get("https://sangria-python-toga.cyclic.app/categories", {
        headers: {
          token: auth.token
        }
      })
      .then(
          resp => {
              console.log(resp.data);
              setCategories({results: resp.data, loading: false, err: null});
          }
      ).catch(err => {
          setCategories({...categories, loading: false, err: err.response.data.errors});
      })
  }, [categories.reload]);

    const deleteCategory = (e) => {
      e.preventDefault();
      const category_id = e.target.value;
      axios.delete("https://sangria-python-toga.cyclic.app/categories", {
          params: {
              id: category_id
          },
          headers : {
            token: auth.token
          }
      })
      .then(
          resp => {
              swal(resp.data.msg,"","success");
              setCategories({...categories, reload: categories.reload + 1});
          }
      ).catch(error => {
          console.log(error);
      })
    }



    return (
      <>
        <section className='CategoryListPage'>
          <div>
            <h1>Category List</h1>
          </div>
          <div className='contain-table'>
            <Link to={'/addCategory'}>
            <button className='addCategoryButton'>
              Add Category
            </button>
            </Link>
            {

              categories.loading == false && categories.err == null &&(
                <Table striped>
                  <thead>
                    <tr>
                      <th>
                        Name
                      </th>
                      <th>
                        Description
                      </th>
                      <th colSpan={2} className='action'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.loading == false && categories.err == null && (
                        categories.results.map((category => (
                          <tr>
                            <td>
                              {category.name}
                            </td>
                            <td className="desc">
                              {category.description}
                            </td>
                            <td className="test" colSpan={2}>
                              <Link to={'/updateCategory/' + category.id}>
                                <button className="button muted-button gl-update-btn">
                                  Update
                                </button>
                              </Link>
                              <button value={category.id} onClick={deleteCategory} className="button muted-button gl-delete-btn">
                                Delete
                              </button>
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
              categories.loading == false && categories.err !== null &&(
                categories.err.map((error, index) => (
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

export default CategoryList;
