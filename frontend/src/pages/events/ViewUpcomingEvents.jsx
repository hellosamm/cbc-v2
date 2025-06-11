import React, { useState, useEffect } from "react";
import { showUserEvents } from "../../apis/attendees";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import styles from "../../style/ManageEvents.module.css";
import { formatDateTime } from "../../utilites/formatDateTime";
import devLog from "../../utilites/devLog";

const ViewUpcomingEvents = () => {
  const { authToken } = useAuth();
  const [userEvents, setUserEvents] = useState([]);
  const [filter, setFilter] = useState("Upcoming");

  useEffect(() => {
    const fetchUserEvents = async () => {
      const [result] = await showUserEvents(authToken);
      devLog("result:", result);

      const formattedEvent = result.data
        .map((event) => ({
          ...event,
          formattedTime: formatDateTime(event.start_time, event.end_time),
        }))
        .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

      setUserEvents(formattedEvent);
    };

    fetchUserEvents();
  }, []);

  const now = new Date();

  const filteredEvents = userEvents.filter((event) => {
    const eventDate = new Date(event.start_time);
    if (filter === "Upcoming") return eventDate > now;
    if (filter === "Past") return eventDate < now;
    return true;
  });

  const allEvents = filteredEvents.map((event) => (
    <div id={event.id} key={event.id}>
      <div className={styles.eventCard}>
        <Link to={`/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}>
          {event.cover_photo ? (
            <img
              src={event.cover_photo}
              alt={`${event.title} Cover`}
              className={styles.imageContainer}
            />
          ) : (
            <div className={styles.imageContainer}></div>
          )}
          <div className={styles.individualEvent}>
            <div>
              <p className={styles.title}>{event.title}</p>
            </div>
            <div className={styles.dateTime}>
              <p>
                {event.formattedTime.formattedDate} |{" "}
                {event.formattedTime.formattedStartTime}
              </p>
            </div>
            {/* <p>{event.location}</p>
            <p className={styles.attending}>6 attending</p> */}
          </div>
        </Link>
      </div>
    </div>
  ));

  const noEvents = (
    <div>
      <p>no events found</p>
    </div>
  );

  return (
    // <div>
    //   <div className="flex ">
    //     <p className="mr-7">event name</p>
    //     <p className="mx-2">|</p>
    //     <p>event date</p>
    //   </div>
    // </div>

    <div className={styles.fullPage}>
      <div className={styles.selectorButtons}>
        <button
          onClick={() => setFilter("Upcoming")}
          className={`${styles.buttonFour} ${
            filter === "Upcoming" ? styles.activeButton : ""
          }`}
        >
          Upcoming Events
        </button>
        <button
          onClick={() => setFilter("Past")}
          className={`${styles.buttonFour} ${
            filter === "Past" ? styles.activeButton : ""
          }`}
        >
          Past Events
        </button>
        <button
          onClick={() => setFilter("All")}
          className={`${styles.buttonFour} ${
            filter === "All" ? styles.activeButton : ""
          }`}
        >
          All Events
        </button>
      </div>
      {/* <h1>your upcoming events</h1> */}
      <div className={styles.allEvents}>
        {filteredEvents.length > 0 ? allEvents : noEvents}
      </div>
    </div>
  );
};

export default ViewUpcomingEvents;
