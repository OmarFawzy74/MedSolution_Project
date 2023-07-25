import React, { useRef, useEffect, useState } from "react";
import "../AddMedicine/AddMedicine.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from "../../localStrorage/Strorage";

const UpdateMedicine = () => {
  const [category_id, setCategoryId] = useState("");

  let { id } = useParams();

  const auth = getAuthUser();

  const [categories, setCategories] = useState({
    results: [],
    loading: false,
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setCategories({ ...categories, loading: true, err: null });
    axios
      .get("http://localhost:4000/categories", {
        headers: {
          token : auth.token
        },
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

  const imageUpdate = useRef(null);

  const [Medicine, SetMedicine] = useState({
    name: "",
    description: "",
    price: "",
    exp_date: "",
    loading: false,
    err: null,
  });

  const updateMedicineData = (e) => {
    e.preventDefault();

    SetMedicine({ ...Medicine, loading: true, err: null });

    const formData = new FormData();

    formData.append("name", Medicine.name);
    formData.append("description", Medicine.description);
    formData.append("price", Medicine.price);
    formData.append("exp_date", Medicine.exp_date);
    formData.append("category_id", category_id);
    formData.append("image_url", imageUpdate.current.files[0]);

    axios
      .put("http://localhost:4000/meds/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: auth.token
        },
      })
      .then((resp) => {
        SetMedicine({
          ...Medicine,
          loading: false,
          err: null,
        });
        imageUpdate.current.value = null;
        swal(resp.data.msg, "", "success");
        console.log(resp.data);
      })
      .catch((errors) => {
        SetMedicine({
          ...Medicine,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  useEffect(() => {
    SetMedicine({ ...Medicine, loading: true });
    axios
      .get("http://localhost:4000/meds", {
        params: {
          medicine_id: id,
        },
        headers : {
          token: auth.token
        }
      })
      .then((resp) => {
        console.log(resp.data);
        SetMedicine({
          ...Medicine,
          name: resp.data[0].name,
          description: resp.data[0].description,
          price: resp.data[0].price,
          exp_date: resp.data[0].exp_date,
          loading: false,
          err: null,
        });
        setCategoryId(resp.data[0].category_id);
      })
      .catch((err) => {
        SetMedicine({ ...Medicine, loading: false, err: err });
      });
  }, []);

  return (
    <>
      <section className="AddMedicinePage">
        <div>
          <h1>Update Medicine</h1>
        </div>
      </section>

      {
        Medicine.loading == false &&
        Medicine.err !== null &&
        Medicine.err.map((error, index) => (
          <Alert key={index} variant={"danger"} className="err-msg-5">
            {error.msg}
          </Alert>
        ))
      }

      <section className="AddMedicine">
        <form className="add-medicine-form" onSubmit={updateMedicineData}>
          <div className="form-control">
            <h2>Name</h2>
            <input
              placeholder="Enter Name"
              required
              value={Medicine.name}
              onChange={(e) =>
                SetMedicine({ ...Medicine, name: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <h2>Description</h2>
            <input
              required
              placeholder="Enter Description"
              value={Medicine.description}
              onChange={(e) =>
                SetMedicine({ ...Medicine, description: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <h2 className="categories-header">Category</h2>
            <Form.Select
              required
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              className="select-category-form"
              aria-label="Default select example"
            >
              <option value={""} disabled selected>
                Select Category
              </option>
              {categories.loading == false &&
                categories.err == null &&
                categories.results.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))}
            </Form.Select>
          </div>
          <div className="form-control">
            <h2>Price</h2>
            <input
              required
              placeholder="Enter Price"
              value={Medicine.price}
              onChange={(e) =>
                SetMedicine({ ...Medicine, price: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <h2>Expiration date</h2>
            <input
              required
              placeholder="Enter Expiration date"
              value={Medicine.exp_date}
              onChange={(e) =>
                SetMedicine({ ...Medicine, exp_date: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <h2>Medicine image</h2>
            <input
              className="image-upload"
              type="file"
              ref={imageUpdate}
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="add-button">
              Update
            </button>

            <Link to={"/adminMedsDashboard"}>
              <button className="cancel-button">Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};
export default UpdateMedicine;
