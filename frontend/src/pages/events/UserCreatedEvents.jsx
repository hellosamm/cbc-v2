import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewAllEventsApi } from "../../apis/events";
import useAuth from "../../hooks/useAuth";
import styles from "../../style/ManageEvents.module.css";
import { formatDateTime } from "../../utilites/formatDateTime";

export default function UserCreatedEvents() {
  const [events, setEvents] = useState([]);
  const { currentUserData, authToken } = useAuth();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const [result] = await viewAllEventsApi();

      const formattedEvent = result
        .map((event) => ({
          ...event,
          formattedTime: formatDateTime(event.start_time, event.end_time),
        }))
        .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

      // const attendeesData = await Promise.all(
      //   result.map(async (event) => {
      //     const attendeesList = await fetchAttendees(authToken, event.id);
      //     return {
      //       id: event.id,
      //       count: Array.isArray(attendeesList) ? attendeesList.length : 0,
      //     };
      //   })
      // );

      setEvents(formattedEvent);
    };

    fetchAllEvents();
  }, []);

  const userCreatedEvents = events.filter(
    (event) => event.user_id === currentUserData.id
  );

  // const userCreatedEvents.sort((a, b) => new Date(b.date) - new Date(a.date))

  const displayEvents = userCreatedEvents.map((event) => (
    <div id={event.id} key={event.id}>
      <Link to={`/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}>
        <div className={styles.eventCard}>
          <div className={styles.imageContainer}></div>
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
            {/* <p>{event.location}</p> */}
            {/* <p className={styles.attending}>6 attending</p> */}
          </div>
        </div>
      </Link>
    </div>
  ));

  const noEvents = (
    <div>
      <p>you do not have any events</p>
    </div>
  );

  return (
    <div className={styles.fullPage}>
      {/* <h1>events you created</h1> */}
      <div className={styles.selectorButtons}>
        <button id="button-4">Upcoming Events</button>
        <button id="button-4">Past Events</button>
        <button id="button-4">All Events</button>
      </div>

      <div className={styles.allEvents}>
        {userCreatedEvents.length > 0 ? displayEvents : noEvents}
      </div>
    </div>
  );
}

//
