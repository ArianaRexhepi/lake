import Home from "./Home";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import LakeModelList from "./LakeModel/LakeModeList";

const Pages = () => {
    return(
      <>
      <Navbar/>
  <Routes>
    <Route path="/" element={<Home />} />   
     <Route path="/login" element={<Login />} />
     <Route path="/lakeslist" element={<LakeModelList />} />
     
     {/* <Route path="/createlakes" element={<CreateLakes />} />
     <Route path="/editlakes/:id" element={<EditLake />} /> */}
      
  </Routes>
  </>
    )
};
export default Pages;
