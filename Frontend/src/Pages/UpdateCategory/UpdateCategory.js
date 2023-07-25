import React, {useEffect, useState} from 'react'
import "../AddCategory/AddCategory.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../localStrorage/Strorage';

const UpdateCategory = () => {
  let { id } = useParams();

  const auth = getAuthUser();

  const [category, setCategory] = useState({
    name: "",
    description: "",
    loading: false,
    err: null,
  });

  const updateCategory = (e) => {
    e.preventDefault();
    setCategory({ ...category, loading: true, err: null });
    axios
      .put("http://localhost:4000/categories/" + id, {
        name: category.name,
        description: category.description,
      },
      {
        headers: {
          token : auth.token
        },
      })
      .then((resp) => {
        setCategory({ ...category, loading: false, err: null });
        swal(resp.data.msg, "", "success");
      })
      .catch((errors) => {
        setCategory({
          ...category,
          loading: false,
          err: errors.response.data.errors,
        });
        console.log(errors);
      });
  };

  useEffect(() => {
    setCategory({ ...category, loading: true });
    axios
      .get("http://localhost:4000/categories", {
        params: {
          id: id,
        },
        headers : {
          token: auth.token
        }
      })
      .then((resp) => {
        console.log(resp.data);
        setCategory({
          ...category,
          name: resp.data[0].name,
          description: resp.data[0].description,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setCategory({ ...category, loading: false, err: err });
      });
  }, []);

  return (
    <>
      <section className="AddCategoryPage">
        <div>
          <h1>Update Category</h1>
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

      <section className="AddCategory">
        <form onSubmit={updateCategory}>
          <div className="form-control">
            <h2>Name</h2>
            <input
              placeholder="Enter Name"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <h2>Description</h2>
            <input
              placeholder="Enter Description"
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="add-button">
              Update
            </button>

            <Link to={"/categoryList"}>
              <button className="cancel-button">Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default UpdateCategory;
