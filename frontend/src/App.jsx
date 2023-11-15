import { useDispatch } from "react-redux";
import "./App.css";

import Pages from "./components/Pages";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "./redux/actions";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
  }, []);

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
        .finally(()=>{
          setLoading(false);
        });
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
