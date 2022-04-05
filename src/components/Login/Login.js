import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import apiUrl from "../../apiUrl";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = apiUrl + "/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 400
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="login_form">
        <div className="left">
          <form className="form" onSubmit={handleSubmit}>
            <h1>Login to Database</h1>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="white_btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
