import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Details.css";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

const Details = () => {
  const state = useSelector((state) => state);
  const { lakeId } = useParams();
  const INITIAL_SIGHTING = {
    longitude: 0,
    latitude: 0,
    userId: state.user?state.user.id:"",
    lakeId: lakeId,
    image: "",
  };
  const [lake, setLake] = useState(null);
  const [show, setShow] = useState(false);
  const [addSighting, setAddSighting] = useState(INITIAL_SIGHTING);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLakeDetails();
  }, [lakeId]);

  const fetchLakeDetails = async () => {
    try {
      const res = await axios.get(`/lakes/${lakeId}`);
      setLake(res.data);
    } catch (error) {
      console.error("Error fetching lake details:", error.response);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/lakeSighting", addSighting)
      .then(() => {
        setShow(false);
        setAddSighting(INITIAL_SIGHTING);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAddSighting({ ...addSighting, [name]: value });
  };

  if (!lake) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="lake-details">
        <div className="lake-details-container">
          <img
            src={lake.image}
            alt={lake.name}
            className="lake-details-image"
          />
          <div>
            <h1>{lake.name}</h1>

            <p className="lake-details-description">{lake.description}</p>
            {state.user && (
              <Button
                className=""
                variant="primary"
                onClick={() => setShow(true)}
              >
                Add Sighting
              </Button>
            )}
            <Button
              variant="success"
              className="ms-5"
              onClick={() => navigate(`/explorelake/${lakeId}`)}
            >
              View Lake Sightings
            </Button>
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Sighting
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="title">Longitude:</label>
              <input
                required
                type="number"
                value={addSighting.longitude}
                name="longitude"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Latitude:</label>
              <input
                required
                type="number"
                value={addSighting.latitude}
                name="latitude"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Image:</label>
              <input
                required
                type="text"
                value={addSighting.image}
                name="image"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button type="submit">Add </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Details;
