import React from "react";
import "../style/Footer.css";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Footer = () => {
  const { loggedIn } = useAuth();

  return (
    <div className="footer">
      {/* <div className="flex space-x-4 items-center">
        <a href="https://www.instagram.com/samm.bakerr/" target="blank">
          <img src={instagram} className="w-6 " />
        </a>
        <a href="https://github.com/hellosamm" target="blank">
          <img src={github} className="w-6" />
        </a>
        <a href="https://www.linkedin.com/in/samm-bakerr/" target="blank">
          <img src={linkedin} className="w-6" />
        </a>
      </div>
      <div className="flex items-center ">
        <div className="pr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
            />
          </svg>
        </div>
        <p>made by samm 2025</p>
      </div> */}

      <div className="footer-columns">
        <div className="left-column">
          {/* <Link to={"/"}>Cookbook Club</Link> */}
          <Link to="/">
            <img
              src="/CBC-blue.png"
              alt="cbcLogo"
              style={{
                height: "1.5rem",
                minWidth: "10vh",
                objectFit: "contain",
              }}
            />
          </Link>
          <p>made by @samm.bakerr</p>
        </div>

        <div className="right-column">
          <div className="stacked-items">
            <Link to={"AllEvents"}>Find an Event</Link>
            <Link to={loggedIn ? "/profile" : "/login"}>
              {loggedIn ? "Manage Your Account" : "Login"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
