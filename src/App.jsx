import { Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Login from "./component/Login";
import ViewPost from "./component/ViewPost";
import SignUp from "./component/SignUp";
import Home from "./component/Home";
import CreatePost from "./component/CreatePost";
import ViewOwnPost from "./component/ViewOwnPost";
import Owner from "./component/Owner";
import AdminLogin from "./component/AdminLogin";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedAdmin from "./utils/ProtectedAdmin";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { accountSuccess } from "./redux/slice/userSlice";


const App = () => {

    const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(accountSuccess(JSON.parse(storedUser)));
    }
  }, [dispatch]);


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Home />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="view-post" element={<ViewOwnPost />} />
            <Route path="view-post-all" element={<ViewPost />} />
          </Route>
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedAdmin />}>
          <Route path="/admin/dashboard" element={<Owner />} />
        </Route>

      </Routes>
    </>
  );
};

export default App;
