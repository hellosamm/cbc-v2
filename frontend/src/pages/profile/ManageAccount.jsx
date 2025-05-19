import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";
import { editUserApi } from "../../apis/authentication";
import styles from "../../style/ManageAccount.module.css";

const initialMessageState = "";

export default function ManageAccount() {
  const { currentUserData, setCurrentUserData, authToken } = useAuth();
  const [message, setMessage] = useState(initialMessageState);
  const [formData, setFormData] = useState({
    first_name: currentUserData.first_name || "",
    last_name: currentUserData.last_name || "",
    // email: currentUserData.email || "",
    username: currentUserData.username || "",
    bio: currentUserData.bio || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //make api call, update the currentUserData with the formData
    // return the updated data to check that it was successful
    const [result, error] = await editUserApi(formData, authToken);

    console.log("result", result);
    // console.log("error", error);

    if (result) {
      setCurrentUserData(result); // Updates UI in memory
      localStorage.setItem("currentUserData", JSON.stringify(result.data)); // Saves to storage
    }

    setMessage(result.message);
  };

  return (
    <div className={styles.fullPage}>
      <div>
        <div className={styles.header}>
          <h1>Update Your Account</h1>
          <button onClick={handleSubmit} id="button-2">
            save profile
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputBlock}>
            <h2>First Name</h2>
            <input
              name="first_name"
              type="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputBlock}>
            <h2>Last Name</h2>
            <input
              name="last_name"
              type="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputBlock}>
            <h2>Username</h2>
            <input
              name="username"
              type="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputBlock}>
            <div>
              <h2>Bio</h2>
              <p>Write a little snippet about yourself</p>
            </div>
            <textarea
              name="bio"
              type="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleInputChange}
              className={styles.inputField}
              // style={{ width: "500px", height: "100px" }}
            />
          </div>
        </form>
        {message && <p className={styles.errors}>{message}</p>}
      </div>
    </div>
  );
}
