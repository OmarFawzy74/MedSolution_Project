import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './PatientMedsDashboard.css'
import MedsCards from '../../Components//MedsCards/MedsCards';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../localStrorage/Strorage';

const PatientMedsDashboard = () => {

    const auth = getAuthUser();

    const [meds, setMeds] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });

    const [search, setSearch] = useState("");
    const [category_id, setCategoryId] = useState("");

    useEffect(() => {
        setMeds({...meds, loading: true})
        axios.get("http://localhost:4000/meds", {
            params: {
                id: auth.id,
                search: search,
                category_id: category_id
            },
            headers : {
                token: auth.token
            }
        })
        .then(
            resp => {
                console.log(resp.data);

                setMeds({results: resp.data, loading: false, err: null})
            }
        ).catch(err => {
            setMeds({...meds, loading: false, err: err})
        })
    }, [meds.reload]);


    const searchMeds = (e) => {
        e.preventDefault();
        console.log(search);
        setMeds({...meds, reload: meds.reload + 1});
    }

    const filter = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        let categoryId = e.target.value

        if(categoryId == 'all') {
            categoryId = ''
        }

        setCategoryId(categoryId);
        setMeds({...meds, reload: meds.reload + 1});
    }


    const[categories, setCategories] = useState({
      results: [],
      loading: false,
      err: null,
      reload: 0
    });

      useEffect(() => {
        setCategories({ ...categories, loading: true, err: null });
        axios
          .get("http://localhost:4000/categories", {
            headers:{
                token: auth.token
            }
          })
          .then((resp) => {
            console.log(resp.data);
            setCategories({
              ...categories,
              results: resp.data,
              loading: false,
              err: null,
            });
          })
          .catch((err) => {
            setCategories({ ...categories, loading: false, err: err });
            console.log(err);
          });
      }, []);

  return (
    <>
        <section className='MedsPage'>
            <div className='meds-header'>
                <h1>Meds Dashboard</h1>
            </div>

            {
                meds.loading === false && (
                    <>
                        <div className='search-container'>
                            <InputGroup className="mb-3 search">
                                <Form.Control value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='search-input' aria-label="Dollar amount (with dot and two decimal places)" />
                                <InputGroup.Text onClick={searchMeds} className='search-ico'><img className='lens-ico' src='images/lens.png' alt=''/></InputGroup.Text>
                            </InputGroup>
                        </div>
            
                        <div className='select-container'>
                            <Form.Select required value={category_id} onChange={filter} className='select-category' aria-label="Default select example">
                                <option value={""} disabled selected>Select Category</option>
                                <option value={"all"}>ALL</option>
                                {
                                    categories.loading == false && categories.err == null && (
                                        categories.results.map((category) => (
                                            <option value={category.id}>{category.name}</option>
                                        ))
                                    )
                                }
                            </Form.Select>
                        </div>
                    </>
                )
            }

            {
                meds.loading === true && (
                    <Spinner className='load-ico' animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )
            }
        </section>

        {
            meds.loading === false && meds.err === null && meds.results.length != 0 && (

            <section className='products'>
                <div className='products-container'>
                {
                    meds.results.map((medicine) => (
                        <div key={medicine.id}>
                            <MedsCards 
                                name={medicine.name} 
                                description={medicine.description} 
                                exp_date={medicine.exp_date} 
                                id={medicine.id} 
                                image={medicine.image_url} 
                                price={medicine.price}
                            />
                        </div>
                    ))
                }
                </div>
            </section>
            )
        }

        {
            meds.loading === false && meds.results.length == 0 && (
                <Alert variant={'danger'} className='err-msg-custom-4'>
                    no medicines found
                </Alert>
            )
        }
        
    </>
  );
}

const massege = () => {
    alert('Hello');
}

export default PatientMedsDashboard;