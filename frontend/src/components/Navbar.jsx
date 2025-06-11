import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
// import { useCookies } from "react-cookie";
import { logoutApi } from "../apis/authentication";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import useAuth from "../hooks/useAuth";
import styles from "../../src/style/Navbar.module.css";
import devLog from "../utilites/devLog";

const Navbar = () => {
  const { currentUserData } = useAuth();
  // const [cookies, setCookies, removeCookie] = useCookies([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isForm =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/createEvent";

  useEffect(() => {
    if (localStorage.authToken) {
      // set state to logged in
      setLoggedIn(true);
      devLog("sign in state:", localStorage.authToken);
    }
  }, [localStorage.authToken]);

  const handleLogout = async () => {
    const [result, authToken, error] = await logoutApi(localStorage.authToken);
    devLog("result: ", result);
    devLog("authToken: ", authToken);
    devLog("error: ", error);

    handleResponse([result, authToken, error]);
  };

  const handleResponse = ([result, authToken, error]) => {
    if (error) {
      devLog("error: ", error);
      // removeCookie("authToken");
      devLog("authToken: ", authToken);
    }

    if (result && !error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUserData");
      setLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <div className={styles.navbar}>
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
              <h2>EVENTS</h2>
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
                    src="/down-arrow.png"
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
                  <h2>LOGIN</h2>
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
