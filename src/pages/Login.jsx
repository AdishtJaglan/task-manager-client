import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.isRegistered) {
      toast.success("User registered successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access);
      localStorage.setItem("rToken", response.data.refresh);

      navigate("/todos", { state: { isLoggedIn: true } });
    } catch (error) {
      toast.error("Error logging in: " + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error("Login failed", error);
    }
  };

  return (
    <>
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
      <div className="bg-blue-300 w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-blue-100 grid grid-rows-4 gap-6 max-w-md w-80 p-6 shadow-md rounded-md"
        >
          <h2 className="text-4xl font-semibold text-justify mt-5">Login</h2>

          <div className="w-full">
            <label className="block text-base font-medium mb-1">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>

          <div className="w-full">
            <label className="block text-base font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-auto h-[48px] py-2 bg-blue-200 text-white font-semibold rounded-md hover:bg-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
