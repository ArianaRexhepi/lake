import Home from "./Home";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import CreateLakeModel from "./LakeModel/CreateLakeModel";
import Details from "./Details";
import MyProfile from "./MyProfile";
import LakeModelList from "./LakeModel/LakeModelList";
import { ProtectedRouteNotLoggedIn } from "./authguard/ProtectedRouteNotLoggedIn";
import { ProtectedRoute } from "./authguard/ProtectedRoute";
import EditLakes from "./LakeModel/EditLakeModel";
import Explore from "./Explore";
import { AdminProtectedRoute } from "./authguard/AdminProtectedRoute";
import LakeSighting from "./LakeSighting";
import LikedLakes from "./LikedLakes";
const Pages = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:lakeId" element={<Details />} />
        <Route path="/explorelake/:lakeId" element={<LakeSighting />} />
        <Route element={<AdminProtectedRoute redirectPath="/" />}>
          <Route path="/lakeslist" element={<LakeModelList />} />
          <Route path="/createlakes" element={<CreateLakeModel />} />
          <Route path="/editlakes/:id" element={<EditLakes />} />
        </Route>
        <Route element={<ProtectedRoute redirectPath="/" />}>
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/likes" element={<LikedLakes />} />
        </Route>
        <Route element={<ProtectedRouteNotLoggedIn redirectPath="/" />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default Pages;
