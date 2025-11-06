import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import API from "../utils/axios";
import { useDispatch } from "react-redux";
import { accountSuccess } from "../redux/slice/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await API.post("/users/login", values);

        if (res.data.success) {
          const user = res.data.user;
          const token = res.data.token;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          dispatch(accountSuccess(user));
          alert("Login Successfully");
          navigate("/");
        } else {
          alert(res.data.message || "Login failed");
        }
      } catch (error) {
        console.error(error.message);
        alert("Something went wrong, please try again");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await API.post("/users/login", formData);

  //     if (res.data.success) {
  //       const user = res.data.user;
  //       const token = res.data.token;

  //       localStorage.setItem("token", token);
  //       localStorage.setItem("user", JSON.stringify(user));

  //       dispatch(accountSuccess(user));

  //       alert("Login Successfully");

  //       navigate("/");
  //     } else {
  //       alert(res.data.message || "Signup failed");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <>
      <div className=" max-sm:h-screen md:h-screen w-full flex justify-center items-center bg-black">
        <form
          onSubmit={formik.handleSubmit}
          className="sm:w-[350px] text-center border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 bg-white dark:bg-zinc-900"
        >
          <h1 className="text-zinc-900 dark:text-white text-3xl mt-10 font-medium">
            Login
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-6">
            Please login to continue
          </p>

          <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            {/* User Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-500 dark:text-zinc-400"
              viewBox="0 0 24 24"
            >
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              placeholder="email"
              className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1 text-left pl-3">
              {formik.errors.email}
            </p>
          )}

          <div className="flex items-center mt-4 w-full bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            {/* Lock Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-500 dark:text-zinc-400"
              viewBox="0 0 24 24"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1 text-left pl-3">
              {formik.errors.password}
            </p>
          )}

          {/* <div className="mt-5 text-left">
            <a
              className="text-sm text-indigo-500 dark:text-indigo-400 cursor-pointer"
              href="#"
            >
              Forgot password?
            </a>
          </div> */}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="mt-2 mb-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity cursor-pointer"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 mb-11">
            <h2>Don't have an account?</h2>

            <Link to="/signup">
              <button
                type="button"
                className="text-indigo-500 dark:text-indigo-400 cursor-pointer"
              >
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
