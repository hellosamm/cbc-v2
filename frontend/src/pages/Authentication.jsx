import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validateEmail, validatePassword } from "../utilites/validations";
import { Link, useNavigate } from "react-router-dom";
import { registerApi, loginApi } from "../apis/authentication";
import { useCookies } from "react-cookie";
import styles from "../style/Authentication.module.css";

const initialErrorsState = {
  email: "",
  password: "",
  login: "",
  api: "",
};

const defaultFormData = {
  email: "",
  password: "",
};

const Authentication = ({ pageType }) => {
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(initialErrorsState);
  const [cookies, setCookies] = useCookies(["jwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.authToken) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("submitted info:", formData);

    const newErrors = { ...initialErrorsState };

    if (!validateEmail(formData.email)) {
      newErrors.email = "invalid login";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "invalid login";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      // console.log("validation failed, aborted API call");
      // console.log("validation errors:", newErrors);
      // console.log("current errors state:", errors);

      return;
    }

    if (pageType === PageType.LOGIN) {
      const [result, authToken, error] = await loginApi({
        user: formData,
      });

      // result = {message:" ", data:{}}
      // auth token = Bearer code or null
      // error -> "" || error message
      // console.log("result:", result);
      // console.log("authToken:", authToken);
      // console.log("error:", error);

      checkAuthToken(authToken, error);
      handleCurrentUserData(result);
      handleResponse([result, error]);
      checkForErrors([error]);
    } else {
      const [result, authToken, error] = await registerApi({
        user: formData,
      });

      // result = {message:" ", data:{}}
      // auth token = Bearer code or null
      // error -> "" || error message
      // console.log("result:", result);
      // console.log("authToken:", authToken);
      // console.log("error:", error);

      checkAuthToken(authToken, error);
      handleCurrentUserData(result);
      handleResponse([result, error]);
      checkForErrors([error.message]);
    }
  };

  const handleResponse = ([result, error]) => {
    // console.log("result: ", result);

    if (error) {
      setErrors((prev) => ({
        ...prev,
        login: error.message || "Login failed. Please try again.",
      }));
    }

    if (result && !error) {
      navigate("/profile");
      window.location.reload();
    }
  };

  const checkAuthToken = (authToken, error) => {
    if (authToken) {
      // console.log("token received, ", authToken);
      localStorage.setItem("authToken", authToken);

      // setCookies("authToken", authToken);
      // console.log("cookies:", cookies.authToken);
    } else if (authToken == null) {
      console.error("failed to retrieve token:", error);
    }
  };

  const handleCurrentUserData = (result) => {
    // console.log(result.data);
    localStorage.setItem("currentUserData", JSON.stringify(result.data));
  };

  const checkForErrors = (error) => {
    const newErrors = { ...initialErrorsState };

    if (error != "") {
      newErrors.login = Array.isArray(error) ? error[0] : error;
    }

    setErrors(newErrors);
  };

  return (
    <div className={styles.fullPage}>
      <div>
        <img
          src="./tablescape.jpeg"
          alt="decorative tablescape"
          className={styles.image}
        />
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.header}>
          {pageType === PageType.LOGIN ? <h1>Sign In</h1> : <h1>register</h1>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputBlock}>
            {/* <p>Email Address</p> */}
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputBlock}>
            {/* <p>Password</p> */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
            {errors.email && <p className={styles.error}>{errors.email}</p>}
            {errors.login && <p className={styles.error}>{errors.login}</p>}
          </div>
          <div>
            <button type="submit" id="button-2" className={styles.button}>
              {pageType === PageType.LOGIN ? "Login" : "Register"}
            </button>
          </div>
          {pageType === PageType.LOGIN ? (
            <div className={styles.alternativeAuthentication}>
              <p>Don't have an account? </p>
              <Link to="/register">Sign Up</Link>
            </div>
          ) : (
            <div className={styles.alternativeAuthentication}>
              <p>Already a user?</p>
              <Link to="/login">Login</Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

Authentication.propTypes = {
  pageType: PropTypes.number.isRequired,
};

export const PageType = Object.freeze({
  LOGIN: 0,
  REGISTER: 1,
});

export default Authentication;
