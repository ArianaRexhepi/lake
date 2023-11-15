import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateLakeModel() {
  const INITIAL_LAKE = {
    name: "",
    description: "",
    image: "",
  };
  const [lake, setLake] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLake({ ...lake, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    await axios
      .post("/lakes", lake)
      .then(() => {
        navigate("/lakeslist");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="form">
          <div className="modal-header">
            <h4 className="modal-title">Add Lake</h4>
            <Link to="/lakeslist">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </Link>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">Name:</label>
              <input
                required
                type="text"
                value={lake.name}
                name="name"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                required
                type="text"
                value={lake.description}
                name="description"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                required
                type="text"
                value={lake.image}
                name="image"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/lakeslist">
              <input type="button" className="btn btn-danger" value="Dismiss" />
            </Link>
            <input
              type="submit"
              value="Create"
              disabled={loading}
              className="btn btn-primary float-right"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLakeModel;
