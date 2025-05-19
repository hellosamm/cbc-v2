import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewSingleEventApi } from "../../apis/events";
import { Link } from "react-router-dom";
import styles from "../../style/CreateEvent.module.css";
import useAuth from "../../hooks/useAuth";
import { updateEvent } from "../../apis/events";

const UpdateEvent = () => {
  const event = useParams();
  const { authToken } = useAuth();
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const [result] = await viewSingleEventApi(event.id);

      setFormData(result.data);
    };
    fetchEvent();
  }, [event.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //make api call, update the currentUserData with the formData
    // return the updated data to check that it was successful
    const [result, error] = await updateEvent(formData, authToken, event.id);

    console.log("result", result);
    // console.log("error", error);

    if (result) {
      setFormData(result); // Updates UI in memory
    }

    setMessage(result.message);
    console.log("success");
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));

  //   // console.log(formData);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   //make api call, update the currentUserData with the formData
  //   // return the updated data to check that it was successful
  //   const [result, error] = await editUserApi(formData, authToken);

  //   console.log("result", result);
  //   // console.log("error", error);

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

  // const handleDateChange = (date) => {
  //   if (date) {
  //     const formattedDate = date.toISOString().split("T")[0];
  //     console.log(formattedDate);
  //     setDate(formattedDate);

  //     setSelectedDate(date);
  //   }
  // };

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
          {/* <div className={styles.inputBlock}>
            <h2>Date</h2>
            <input
              name="date"
              type="text"
              placeholder="date"
              value={formData.start_time}
              className={styles.inputField}
            />
          </div> */}
          {/* <div className={styles.inputBlock}>
            <h2>Start Time</h2>
            <input
              name="start time"
              type="text"
              placeholder="start time"
              value={formData.start_time}
              className={styles.inputField}
              onChange={handleInputChange}
            />
          </div> */}
          {/* <div className={styles.inputBlock}>
            <h2>End Time</h2>
            <input
              name="end time"
              type="text"
              placeholder="end time"
              value={formData.end_time}
              className={styles.inputField}
              onChange={handleInputChange}
            />
          </div> */}
        </form>
        {message && <p className={styles.errors}>{message}</p>}
      </div>
    </div>
  );
};

export default UpdateEvent;
