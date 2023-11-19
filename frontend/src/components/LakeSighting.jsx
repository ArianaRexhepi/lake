import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

const LakeSighting = () => {
  const [lake, setLake] = useState("");
  const { lakeId } = useParams();
  const [lakeSightings, setLakeSightings] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [funfacts, setFunFacts] = useState([]);

  const fetchLakeSightings = async () => {
    await axios
      .get(`/lakeSighting/${lakeId}`)
      .then(async (res) => {
        setLakeSightings(res.data);
        if (res.data && res.data.length > 0) {
          for (const data of res.data) {
            await axios.get("https://catfact.ninja/fact").then((response) => {
              const newitem = [...funfacts, response.data.fact];
              setFunFacts(newitem);
            });
          }
        }
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

  useEffect(() => {
    fetchLakeSightings();
    fetchLakeDetails();
  }, [lakeId]);

  if (loadingInitial) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-center mb-5 mt-5 " style={{ color: 'darkblue' }}><b><i>Lake Sightings</i></b></h1>
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
                <p >
                  <b style={{ color: 'darkblue' }}><i>Longtitude: </i></b>{sighting.longitude}
                </p>
                <p><b style={{ color: 'darkblue' }}><i>Latitude: </i></b>{sighting.latitude}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LakeSighting;
