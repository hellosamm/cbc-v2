import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, Outlet, useLocation } from "react-router-dom";
import { editUserApi } from "../apis/authentication";
import styles from "../../src/style/Profile.module.css";

const initialMessageState = "";

const Profile = () => {
  const location = useLocation();

  return (
    <div className={styles.fullPage}>
      <div className={styles.header}>
        {/* <div className={styles.tab}> */}
        <div
          className={`${styles.tab} ${
            location.pathname === "/profile/manageAccount" ? styles.active : ""
          }`}
        >
          <Link to="/profile/manageAccount">
            <h2>Manage Your Account</h2>
          </Link>
        </div>
        <div
          className={`${styles.tab} ${
            location.pathname === "/profile/manageEvents" ? styles.active : ""
          }`}
        >
          <Link to="/profile/manageEvents">
            <h2>Manage Your Events</h2>
            <p>(events you created)</p>
          </Link>
        </div>
        <div
          className={`${styles.tab} ${
            location.pathname === "/profile/upcomingEvents" ? styles.active : ""
          }`}
        >
          <Link to="/profile/upcomingEvents">
            <h2>Events Calendar</h2>
            <p>(events you RSVP'd to)</p>
          </Link>
        </div>
      </div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
