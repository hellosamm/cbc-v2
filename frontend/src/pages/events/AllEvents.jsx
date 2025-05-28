import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewAllEventsApi } from "../../apis/events";
// import "../../style/AllEvents.css";
import styles from "../../style/AllEvents.module.css";
import "../../App.css";
import { formatDateTime } from "../../utilites/formatDateTime";
import { fetchAttendees } from "../../utilites/fetchAttendees";
import useAuth from "../../hooks/useAuth";

const AllEvents = () => {
  const { authToken } = useAuth();
  const [upcomingEventsList, setUpcomingEventsList] = useState([]);
  const [pastEventsList, setPastEventsList] = useState([]);
  const [attendees, setAttendees] = useState({});
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  // const s3BaseUrl = import.meta.env.VITE_S3_BASE_URL || "";

  useEffect(() => {
    const fetchAllEvents = async () => {
      const result = await viewAllEventsApi();
      console.log(result);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingEvents = [];
      const pastEvents = [];

      result.data.forEach((event) => {
        // console.log(event.cover_photo_url);
        const formattedEvent = {
          ...event,
          formattedTime: formatDateTime(event.start_time, event.end_time),
        };

        if (new Date(event.start_time) >= today) {
          upcomingEvents.push(formattedEvent);
        } else {
          pastEvents.push(formattedEvent);
        }
      });

      upcomingEvents.sort(
        (a, b) => new Date(a.start_time) - new Date(b.start_time)
      );

      pastEvents.sort(
        (a, b) => new Date(b.start_time) - new Date(a.start_time)
      );

      const attendeesData = await Promise.all(
        upcomingEvents.map(async (event) => {
          const attendeesList = await fetchAttendees(authToken, event.id);
          return {
            id: event.id,
            count: Array.isArray(attendeesList) ? attendeesList.length : 0,
          };
        })
      );

      const attendeesObject = attendeesData.reduce((acc, { id, count }) => {
        acc[id] = count;
        return acc;
      }, {});

      //   for (const event of result) {
      //     const attendeeCount = await fetchAttendees(authToken, id);
      //     attendeesData[event.id] = attendeeCount;
      //   }
      setAttendees(attendeesObject);

      setUpcomingEventsList(upcomingEvents);
      setPastEventsList(pastEvents);
    };

    fetchAllEvents();
  }, [authToken]);

  const allEvents = upcomingEventsList.map((event) => {
    // const imageUrl = getImageUrl(event.cover_photo_url);
    // console.log(event.cover_photo_url);
    console.log(event.cover_photo_url);

    return (
      <div className={styles.eventCard} id={event.id} key={event.id}>
        <Link to={`/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}>
          {/* <div className={styles.imageContainer}></div> */}
          {event.cover_photo_url ? (
            <img
              src={event.cover_photo_url}
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
              {/* <p>thursday, month 9th | 4:30 pm</p> */}
              <p>
                {event.formattedTime.formattedDate} |{" "}
                {event.formattedTime.formattedStartTime}
              </p>
            </div>
            <p>{event.location}</p>
            <p className={styles.attending}>{attendees[event.id]} attending</p>
          </div>
        </Link>
      </div>
    );
  });

  const pastEvents = pastEventsList.map((event) => (
    <div className={styles.eventCard} id={event.id} key={event.id}>
      <Link to={`/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}>
        <div className={styles.imageContainer}></div>
        <div className={styles.individualEvent}>
          <div>
            <p className={styles.title}>{event.title}</p>
          </div>
          <div className={styles.dateTime}>
            {/* <p>thursday, month 9th | 4:30 pm</p> */}
            <p>
              {event.formattedTime.formattedDate} |{" "}
              {event.formattedTime.formattedStartTime}
            </p>
          </div>
          <p>{event.location}</p>
          <p className={styles.attending}>{attendees[event.id]} attending</p>
        </div>
      </Link>
    </div>
  ));

  const displayPastEvents = () => {
    setShowPastEvents(!showPastEvents);
  };

  const noEvents = (
    <div>
      <p>no events available</p>
    </div>
  );

  return (
    <div className={styles.fullPage}>
      <div className={styles.header}>
        <h1>upcoming events</h1>
        <div>
          <Link to="/createEvent" id="button-2">
            create an event
          </Link>
        </div>
      </div>

      <div className={styles.allEvents}>
        {upcomingEventsList.length > 0 ? allEvents : noEvents}{" "}
      </div>

      <div className={styles.pastEvents}>
        <h1>past events</h1>
        <img
          src="/down-arrow.png"
          alt="Dropdown Icon"
          className="w-10 h-10"
          onClick={displayPastEvents}
        />
      </div>
      {showPastEvents && (
        <div className={styles.allEvents}>
          {pastEventsList.length > 0 ? pastEvents : noEvents}{" "}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
