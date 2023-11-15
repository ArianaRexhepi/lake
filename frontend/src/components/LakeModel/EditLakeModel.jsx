import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditLakes() {
  const [loading, setLoading] = useState(false);
  const [lakes, setLakes] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/lakes/${id}`)
      .then((response) => {
        setLakes(response.data);
        console.log(response.data);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios
        .put(`/lakes/${id}`, lakes)
        .then(() => {
          setLoading(false);
          navigate("/lakeslist");
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (lakes === null) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop:'50px' }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Lake</h4>
            <Link to="/bestsellers">
            <button type="button" className="btn-close" aria-label="Close"></button>
            </Link>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Name:</label>
              <input required
                type="text"
                name="name"
                className="form-control"
                value={lakes.name}
                onChange={(e) =>
                  setLakes({ ...lakes, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label> Description:</label>
              <input required
                type="text"
                name="description"
                className="form-control"
                value={lakes.description}
                onChange={(e) =>
                  setLakes({ ...lakes, description: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input required
                type="text"
                name="image"
                className="form-control"
                value={lakes.image}
                onChange={(e) =>
                  setLakes({ ...lakes, image: e.target.value })
                }
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/lakeslists">
              <input type="button" className="btn btn-dark" value="Dismiss" />
            </Link>
            <input
              onClick={handleSubmit}
              type="submit"
              disabled={loading}
              value="Edit"
              className="btn btn-primary float-right"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditLakes;
