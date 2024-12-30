import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { userLoginThunk } from "../redux/auth/authSlice";
import { authActions } from "../redux/auth/authSlice";
// import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:"user"
  });

  const { email, password, role } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(authActions.reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try{
      dispatch(userLoginThunk(formData)).unwrap();
      navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <section className="text-center">
        <h1 className="text-3xl mb-4 flex items-center">
          <FaSignInAlt className="mr-2" /> Login
        </h1>
        <p>Please Login to get support!</p>
      </section>

      <section className="mt-8 w-full max-w-xs">
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mb-4">
            <select
              name="role"
              value={role}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
