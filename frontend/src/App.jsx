import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import Pages from "./components/Pages";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { setFavorites, setUser } from "./redux/actions";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (state.user) {
      getFavorites();
    }
  }, [state.user]);

  const getFavorites = async () => {
    await axios
      .get("/favorite")
      .then((result) => {
        dispatch(setFavorites(result.data));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const getUser = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setLoading(true);
      await axios
        .get("/account")
        .then((res) => dispatch(setUser(res.data)))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Pages />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
