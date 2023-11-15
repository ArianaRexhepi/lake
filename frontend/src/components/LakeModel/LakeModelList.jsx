// LakeModelList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LakeModelList() {
  const [lakes, setLakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    await axios
      .get("/lakes")
      .then((response) => {
         setLakes(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .finally(() => {
         setLoading(false);
      });
   
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lake?"
    );
    if (confirmed) {
      await axios
        .delete(`/lakes/${id}`)
        .then(() => {
          setLakes(lakes.filter((lake) => lake.id !== id));
        });
    } 
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Lakes</h1>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <div className="float-right">
                <button
                  onClick={() => navigate("/createlakes")}
                  className="btn btn-primary"
                >
                  Create new
                </button>
              </div>
            </div>

            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {lakes.map((lake) => (
                  <tr key={lake.id}>
                    <td>{lake.id}</td>
                    <td>{lake.name}</td>
                    <td>
                      <Link to={`/details/${lake.id}`}>
                        <img
                          src={lake.image}
                          alt=""
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                    </td>
                    <td>{lake.description}</td>
                    <td>
                      <Link to={`/editlakes/${lake.id}`}>
                        <button className="btn btn-primary">Edit</button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(lake.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default LakeModelList;
