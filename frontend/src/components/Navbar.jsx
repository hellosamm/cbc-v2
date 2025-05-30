import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { logoutApi } from "../apis/authentication";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import useAuth from "../hooks/useAuth";
import styles from "../../src/style/Navbar.module.css";

const Navbar = () => {
  const { currentUserData } = useAuth();
  const [cookies, setCookies, removeCookie] = useCookies([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isForm =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/createEvent";

  useEffect(() => {
    if (cookies.authToken) {
      // set state to logged in
      setLoggedIn(true);
      console.log("sign in state:", cookies.authToken);
    }
  }, [cookies.authToken]);

  const handleLogout = async () => {
    const [result, authToken, error] = await logoutApi(cookies.authToken);
    console.log("result: ", result);
    console.log("authToken: ", authToken);
    console.log("error: ", error);

    handleResponse([result, authToken, error]);
  };

  const handleResponse = ([result, authToken, error]) => {
    if (error) {
      console.log("error: ", error);
      // removeCookie("authToken");
      console.log("authToken: ", authToken);
    }

    if (result && !error) {
      removeCookie("authToken");
      setLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <div>
      {!isForm && (
        <div className={styles.navbarContainer}>
          <div className={styles.navbarContent}>
            <Link to="/">
              <img
                src="/CBC-blue.png"
                alt="cbcLogo"
                style={{
                  height: "4rem",
                  minWidth: "10vh",
                  objectFit: "contain",
                  margin: "1rem",
                  // padding: "1rem",
                }}
              />
            </Link>
            <Link to="allEvents" className={styles.navLink}>
              <h2>Events</h2>
            </Link>

            {loggedIn ? (
              <Menu as="div" className={styles.menu}>
                <MenuButton className={styles.menuButton}>
                  <div className={styles.navLink}>
                    <h2>
                      @{currentUserData.username || currentUserData.email}
                    </h2>
                  </div>
                  <img
                    src="/public/down-arrow.png"
                    alt="Dropdown Icon"
                    className="ml-2 w-6 h-6"
                  />
                </MenuButton>
                <MenuItems className={styles.menuItems}>
                  <div>
                    <MenuItem>
                      <Link className={styles.menuItem} to="profile">
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link className={styles.menuItem} to="createEvent">
                        Create Event
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/"
                        className={styles.menuItem}
                        role="menuitem"
                        tabIndex={-1}
                        onClick={async (e) => {
                          e.preventDefault();
                          await handleLogout();
                        }}
                      >
                        Logout
                      </Link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            ) : (
              <div className={styles.navLink}>
                <Link to="login">
                  <h2>Login</h2>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {/* <div>
        <Outlet />
      </div> */}
    </div>
  );
};

export default Navbar;
