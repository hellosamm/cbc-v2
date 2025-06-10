import { APIV1, DOMAIN } from "./config";
import devLog from "../utilites/devLog";

export const createEventApi = async (authToken, formData) => {
  const requestOptions = {
    method: "POST",
    headers: { Authorization: authToken },
    body: formData,
  };

  try {
    const response = await fetch(`${DOMAIN}${APIV1}/events`, requestOptions);

    if (response.ok) {
      const result = await response.json();

      return [result, ""];
    } else if (response.status == 401) {
      devLog("response was unsucessful");

      const errorMessage = await response.text();
      return [null, errorMessage];
    } else if (response.status == 422) {
      devLog("response was unsucessful");

      const errorMessage = await response.json();
      return [null, errorMessage];
    }
  } catch (error) {
    devLog("network errror: ", error);
    return [`server down: ${error}`];
  }
};

export const viewAllEventsApi = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(`${DOMAIN}${APIV1}/events`, requestOptions);

    if (response.ok) {
      const result = await response.json();

      return result;
    }
  } catch (error) {
    devLog("network errror: ", error);
    return [`server down: ${error}`];
  }
};

export const viewSingleEventApi = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      `${DOMAIN}${APIV1}/events/${id}`,
      requestOptions
    );

    if (response.ok) {
      const result = await response.json();
      devLog("request was successful");
      devLog(result);
      return [result];
    }
  } catch (error) {
    devLog("network errror: ", error);
    return [`server down: ${error}`];
  }
};

export const checkUserRSVP = async (authToken, id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: authToken },
  };

  try {
    const response = await fetch(
      `${DOMAIN}${APIV1}/events/${id}/attendance_status`,
      requestOptions
    );
    if (response.ok) {
      const result = await response.json();
      return [result];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return [`server down: ${error}`];
  }
};

export const updateEvent = async (formData, authToken, id) => {
  const requestOptions = {
    method: "PATCH",
    headers: { Authorization: authToken },
    body: formData,
  };

  try {
    const response = await fetch(
      `${DOMAIN}${APIV1}/events/${id}`,
      requestOptions
    );

    if (response.ok) {
      const result = await response.json();

      return [result, ""];
    } else if (response.status == 422) {
      // } else {
      devLog("response was unsucessful");

      const errorMessage = await response.json();
      return [null, errorMessage];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return ["", `server down: ${error}`];
  }
};
