import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo text-white text-xl">
          <Link to="/">Support Desk</Link>
        </div>
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/"
              className="text-white flex items-center hover:text-gray-300"
            >
              Home
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link
                  to="/tickets"
                  className="text-white flex items-center hover:text-gray-300"
                >
                  Tickets
                </Link>
              </li>
              <li className="text-white">{user.email}</li>
            </>
          )}
          {user ? (
            <li>
              <button
                className="btn text-white flex items-center"
                onClick={onLogout}
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white flex items-center hover:text-gray-300"
                >
                  <FaSignInAlt className="mr-1" /> Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white flex items-center hover:text-gray-300"
                >
                  <FaUser className="mr-1" /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
