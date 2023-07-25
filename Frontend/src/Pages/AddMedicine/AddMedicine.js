import React, { useRef, useEffect, useState } from "react";
import "../AddMedicine/AddMedicine.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../localStrorage/Strorage";
import Form from "react-bootstrap/Form";

const AddMedicine = () => {
  const auth = getAuthUser();

  const [category_id, setCategoryId] = useState("");

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
          token: auth.token,
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

  const image = useRef(null);

  const [medicine, setMedicine] = useState({
    name: "",
    description: "",
    price: "",
    exp_date: "",
    loading: false,
    err: null,
  });

  const addMedicineData = (e) => {
    e.preventDefault();

    setMedicine({ ...medicine, loading: true, err: null });

    const auth = getAuthUser();

    const formData = new FormData();

    formData.append("name", medicine.name);
    formData.append("description", medicine.description);
    formData.append("price", medicine.price);
    formData.append("exp_date", medicine.exp_date);
    formData.append("category_id", category_id);
    formData.append("image", image.current.files[0]);

    axios
      .post("http://localhost:4000/meds", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: auth.token,
        },
      })
      .then((resp) => {
        setMedicine({
          ...medicine,
          loading: false,
          err: null,
          name: "",
          description: "",
          price: "",
          exp_date: "",
        });
        setCategoryId("");
        image.current.value = null;
        swal(resp.data.msg, "", "success");
      })
      .catch((errors) => {
        setMedicine({
          ...medicine,
          loading: false,
          err: errors.response.data.errors
        });
        image.current.value = null;
      });
  };

  return (
    <>
      <section className="AddMedicinePage">
        <div>
          <h1>Add Medicine</h1>
        </div>
      </section>
      {
        medicine.loading == false &&
        medicine.err !== null &&
        medicine.err.map((error, index) => (
          <Alert key={index} variant={"danger"} className="err-msg-5">
            {error.msg}
          </Alert>
        ))
      }

      <section className="AddMedicine">
        <form className="add-medicine-form" onSubmit={addMedicineData}>
          <div className="form-control">
            <h2>Name</h2>
            <input
              placeholder="Enter Name"
              required
              value={medicine.name}
              onChange={(e) =>
                setMedicine({ ...medicine, name: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <h2>Description</h2>
            <input
              required
              placeholder="Enter Description"
              value={medicine.description}
              onChange={(e) =>
                setMedicine({ ...medicine, description: e.target.value })
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
              min={"0.01"}
              placeholder="Enter Price"
              value={medicine.price}
              onChange={(e) =>
                setMedicine({ ...medicine, price: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <h2>Expiration date</h2>
            <input
              required
              placeholder="Enter Expiration date"
              value={medicine.exp_date}
              onChange={(e) =>
                setMedicine({ ...medicine, exp_date: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <h2>Medicine image</h2>
            <input required className="image-upload" type="file" ref={image} />
          </div>
          <div className="btn-container">
            <button type="submit" className="add-button">
              Add
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
export default AddMedicine;
