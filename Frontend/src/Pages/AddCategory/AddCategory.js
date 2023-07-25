import React, { useState } from 'react';
import '../AddCategory/AddCategory.css'
import { Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../localStrorage/Strorage';

const AddCategory = () => {

    const auth = getAuthUser();
    
    const[category, setCategory] = useState({
        name: "",
        description: "",
        loading: false,
        err: null
      });
    
      const addCategory = (e) => {
        e.preventDefault();
        setCategory({...category, loading: true, err: null});
        axios.post("http://localhost:4000/categories", {
            name: category.name,
            description: category.description
        },
        {
            headers: {
                token : auth.token
            },
        })
        .then((resp) => {
            setCategory({...category, name: "", description:"", loading: false, err: null});
            swal(resp.data.msg,"","success");
        })
        .catch((errors) => {
            setCategory({...category, loading: false, err: errors.response.data.errors});
        })
      }



  return (
    <>
            <section className='AddCategoryPage'>
                <div>
                    <h1>Add Category</h1>
                </div>
            </section>

            {   
                category.loading == false && category.err !== null &&(
                    category.err.map((error, index) => (
                        <Alert key={index} variant={'danger'} className='err-msg-5'>
                            {error.msg}
                        </Alert>
                    ))
                )
            }

            <section className='AddCategory'>
                <form onSubmit={addCategory}>
                    <div className='form-control'>
                        <h2>Name</h2>
                        <input
                        required
                        placeholder='Enter Name'
                        value={category.name}
                        onChange={(e) => setCategory({...category, name: e.target.value})}
                        />
                    </div>
                    <div className='form-control'>
                        <h2>Description</h2>
                        <input
                        required
                        placeholder='Enter Description'
                        value={category.description}
                        onChange={(e) => setCategory({...category, description: e.target.value})}
                        />
                    </div>
                    <div className='btn-container'>
                        <button type="submit" className='add-button'>Add</button>

                        <Link to={"/categoryList"}>
                            <button className='cancel-button'>Cancel</button>
                        </Link>
                    </div>
                </form>
            </section>
        </>
  )
}

export default AddCategory
