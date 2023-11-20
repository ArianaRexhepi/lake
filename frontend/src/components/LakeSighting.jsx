import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const LakeSighting = () => {
  const [lake, setLake] = useState("");
  const { lakeId } = useParams();
  const [lakeSightings, setLakeSightings] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [funfacts, setFunFacts] = useState([]);
  const state = useSelector((state) => state);

  const fetchLakeSightings = async () => {
    await axios
      .get(`/lakeSighting/${lakeId}`)
      .then(async (res) => {
        setLakeSightings(res.data);
        console.log(res.data);
        fetchFunFacts(res.data);
        setLoadingInitial(false);
      })
      .catch((error) => {
        console.log("Error fetching lake details:", error.response);
        setLoadingInitial(false);
      });
  };

  const fetchLakeDetails = async () => {
    try {
      const res = await axios.get(`/lakes/${lakeId}`);
      setLake(res.data);
    } catch (error) {
      console.error("Error fetching lake details:", error.response);
    }
  };

  const fetchFunFacts = async (array) => {
    if (array && array.length > 0) {
      const stringArr = [];
      for (const data of array) {
        await axios.get("https://catfact.ninja/fact").then((response) => {
          stringArr.push(response.data.fact);
        });
      }
      setFunFacts(stringArr);
    }
  };

  useEffect(() => {
    fetchLakeSightings();
    fetchLakeDetails();
  }, [lakeId]);

  if (loadingInitial) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id) => {
    await axios
      .delete(`/lakeSighting/${id}`)
      .then(async (res) => {
        const newLakeArr = lakeSightings.filter((a) => a.id !== id);
        setLakeSightings(newLakeArr);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <h1 className="text-center mb-5 mt-5 " style={{ color: "darkblue" }}>
        <b>
          <i>Lake Sightings</i>
        </b>
      </h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {lakeSightings.map((sighting, index) => (
          <SwiperSlide key={index}>
            <div className="lake-details-container">
              <img
                src={sighting.image}
                alt={"image"}
                className="lake-details-image"
              />
              <div>
                <h1>{lake.name}</h1>
                <p>Fun Fact: {funfacts[index]}</p>
                <p>
                  <b style={{ color: "darkblue" }}>
                    <i>Longtitude: </i>
                  </b>
                  {sighting.longitude}
                </p>
                <p>
                  <b style={{ color: "darkblue" }}>
                    <i>Latitude: </i>
                  </b>
                  {sighting.latitude}
                </p>
                {state.user.id === sighting.userId && (
                  <Button
                    onClick={() => handleDelete(sighting.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LakeSighting;
