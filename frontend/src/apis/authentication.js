import { DOMAIN, APIV1 } from "./config";

export const registerApi = async (userData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(`${DOMAIN}/users`, requestOptions);

    if (response.ok) {
      const result = await response.json();
      const authToken = response.headers.get("Authorization");

      return [result, authToken, ""];
    } else if (response.status == 422) {
      // } else {
      console.log("response was unsucessful");

      const errorMessage = await response.json();
      return [null, null, errorMessage];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return ["", `server down: ${error}`];
  }
};

export const loginApi = async (userData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(`${DOMAIN}/users/sign_in/`, requestOptions);

    if (response.ok) {
      const result = await response.json();
      console.log("response was successful");

      const authToken = response.headers.get("Authorization");
      console.log(authToken);

      return [result, authToken, ""];
    } else if (response.status == 401) {
      console.log("response was unsuccessful");

      const errorMessage = await response.text();
      return [null, null, errorMessage];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return ["", "", `server down: ${error}`];
  }
};

export const logoutApi = async (authToken) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  };

  try {
    const response = await fetch(`${DOMAIN}/users/sign_out/`, requestOptions);

    if (response.ok) {
      const result = await response.json();
      console.log("response was successful");

      return [result, authToken, ""];
    } else if (response.status == 401) {
      console.log("response was unsuccessful");

      const errorMessage = await response.json();
      return [null, authToken, errorMessage];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return ["", "", `server down: ${error}`];
  }
};

export const editUserApi = async (formData, authToken) => {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: authToken },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(
      `${DOMAIN}${APIV1}/users/update`,
      requestOptions
    );

    if (response.ok) {
      const result = await response.json();

      return [result, ""];
    } else if (response.status == 422) {
      // } else {
      console.log("response was unsucessful");

      const errorMessage = await response.json();
      return [null, errorMessage];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return ["", `server down: ${error}`];
  }
};
