import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const [cookies] = useCookies(["authToken"]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUserData")) || {};
  });

  useEffect(() => {
    if (cookies.authToken) {
      // set state to logged in
      const userData =
        JSON.parse(localStorage.getItem("currentUserData")) || {};
      setLoggedIn(true);
      setCurrentUserData(userData);
    } else {
      setLoggedIn(false);
      setCurrentUserData({});
    }
  }, [cookies.authToken]);
  return {
    loggedIn,
    authToken: cookies.authToken,
    currentUserData,
    setCurrentUserData,
  };
};

export default useAuth;
