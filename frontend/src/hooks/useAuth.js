import { useEffect, useState } from "react";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUserData")) || {};
  });

  useEffect(() => {
    if (localStorage.authToken) {
      // set state to logged in
      const userData =
        JSON.parse(localStorage.getItem("currentUserData")) || {};
      setLoggedIn(true);
      setCurrentUserData(userData);
    } else {
      setLoggedIn(false);
      setCurrentUserData({});
    }
  }, [localStorage.authToken]);
  return {
    loggedIn,
    authToken: localStorage.authToken,
    currentUserData,
    setCurrentUserData,
  };
};

export default useAuth;
