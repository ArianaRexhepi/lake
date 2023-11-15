import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    userId: state.user.id,
    lakeId: lakeId,
    image: "",
  };
  const [lake, setLake] = useState(null);
  const [show, setShow] = useState(false);
  const [addSighting, setAddSighting] = useState(INITIAL_SIGHTING);

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

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAddSighting({ ...addSighting, [name]: value });
  };

  if (!lake) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="lake-details-container">
        <h1>{lake.name}</h1>
        <img src={lake.image} alt={lake.name} className="lake-details-image" />
        <p className="lake-details-description">{lake.description}</p>
        <Button onClick={() => setShow(true)}>Add Sighting</Button>
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
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="title">Longtitude:</label>
            <input
              required
              type="number"
              value={addSighting.longitude}
              name="longtitude"
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
          <Button>Add </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Details;
