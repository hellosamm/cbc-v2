import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewSingleEventApi } from "../../apis/events";
import { Link } from "react-router-dom";
import styles from "../../style/CreateEvent.module.css";
import useAuth from "../../hooks/useAuth";
import { updateEvent } from "../../apis/events";
import devLog from "../../utilites/devLog";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

const UpdateEvent = () => {
  const event = useParams();
  const { authToken } = useAuth();
  const [message, setMessage] = useState();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const [result] = await viewSingleEventApi(event.id);

      setFormData(result.data);

      setDate(formatDate(result.data.start_time));

      setStartTime(stringTo24(result.data.start_time));
      setEndTime(stringTo24(result.data.end_time));
    };
    fetchEvent();
  }, [event.id]);

  useEffect(() => {
    if (startTime) {
      devLog("start time changed:", startTime);
      devLog("date", date);
    }
  }, [startTime, date]);

  function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function stringTo24(isoString) {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const combined = `${date} ${startTime}`;
    console.log("combined:", combined);
    const d = new Date(combined);
    console.log("new Date:", d);

    //make api call, update the currentUserData with the formData
    // return the updated data to check that it was successful
    const formattedData = new FormData();

    formattedData.append("event[title]", formData.title);
    formattedData.append("event[location]", formData.location);
    formattedData.append("event[description]", formData.description);
    formattedData.append(
      "event[start_time]",
      new Date(`${date} ${startTime}`).toISOString()
    );
    formattedData.append(
      "event[end_time]",
      new Date(`${date} ${endTime}`).toISOString()
    );

    // if (formData.cover_photo) {
    //   formattedData.append("event[cover_photo]", formData.cover_photo);
    // }

    const [result, error] = await updateEvent(
      formattedData,
      authToken,
      event.id
    );

    devLog("result", result);
    devLog("error", error);

    if (result) {
      setFormData(result); // Updates UI in memory
    }

    setMessage(result.message);
    devLog("success");
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));

  //   devLog(formData);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   //make api call, update the currentUserData with the formData
  //   // return the updated data to check that it was successful
  //   const [result, error] = await editUserApi(formData, authToken);

  //   devLog("result", result);
  //   // devLog("error", error);

  //   if (result) {
  //     setCurrentUserData(result); // Updates UI in memory
  //     localStorage.setItem("currentUserData", JSON.stringify(result.data)); // Saves to storage
  //   }

  //   setMessage(result.message);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);

  //   if (!date || !startTime || !endTime) {
  //     console.error("Missing required field");
  //     setErrors("Missing required field");
  //     return;
  //   }

  //   const formattedData = {
  //     ...formData,
  //     start_time: new Date(`${date} ${startTime}`).toISOString(),
  //     end_time: new Date(`${date} ${endTime}`).toISOString(),
  //   };

  //   const [result, error] = await createEventApi(authToken, formattedData);

  //   console.log("result:", result);
  //   console.log("error:", error.message);

  //   handleResponse([result, error]);
  // };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      console.log("formatted date", formattedDate);
      console.log("date", date);
      setDate(formattedDate);
    }
  };

  return (
    <div className={styles.createEvent}>
      <div className={styles.fullPage}>
        <div className={styles.header}>
          <div className={styles.leftHeader}>
            {/* <Link to={`/profile/manageEvents`}>back</Link> */}
            <h1>{event.title}</h1>
          </div>
          <button onClick={handleSubmit} id="button-2">
            save
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputBlock}>
            <h2>Event Title</h2>
            <input
              name="title"
              type="text"
              // placeholder="title"
              value={formData.title}
              className={styles.inputField}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputBlock}>
            <div>
              <h2>Event Location</h2>
              <p>provide the address for event attendees</p>
            </div>
            <input
              name="location"
              type="text"
              // placeholder="title"
              value={formData.location}
              className={styles.inputField}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputBlock}>
            <h2>Description</h2>
            <textarea
              name="description"
              type="text"
              // placeholder="title"
              value={formData.description}
              className={styles.inputField}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputBlock}>
            <h2>Date</h2>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              dateFormat={"yyyy-MM-dd"}
              minDate={new Date()}
              placeholder="Select a Date"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputBlock}>
            <h2>Start Time</h2>
            <TimePicker
              onChange={setStartTime}
              value={startTime}
              format="hh:mm a"
              disableClock={true}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputBlock}>
            <h2>End Time</h2>
            <TimePicker
              onChange={setEndTime}
              value={endTime}
              format="hh:mm a"
              disableClock={true}
              className={styles.inputField}
            />
          </div>
        </form>
        {message && <p className={styles.errors}>{message}</p>}
      </div>
    </div>
  );
};

export default UpdateEvent;
