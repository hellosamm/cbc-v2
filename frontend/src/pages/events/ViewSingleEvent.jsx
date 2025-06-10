import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { checkUserRSVP, viewSingleEventApi } from "../../apis/events";
import {
  attendeeSignUp,
  cancelSignUp,
  showEventAttendees,
} from "../../apis/attendees";
import { formatDateTime } from "/src/utilites/formatDateTime.js";
import useAuth from "../../hooks/useAuth";
import styles from "../../style/SingleEvent.module.css";
import { fetchAttendees } from "../../utilites/fetchAttendees";
import devLog from "../../utilites/devLog";

const ViewSingleEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUserData, authToken } = useAuth();
  const [event, setEvent] = useState([]);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const [isAttending, setIsAttending] = useState(false);
  // const [isCreator, setIsCreator] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState({
    attending: null,
    creator: null,
  });
  const [currentAttendees, setCurrentAttendees] = useState([]);
  const [formattedTimes, setFormattedTimes] = useState({});

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     const [result] = await viewSingleEventApi(id);
  //     setEvent(result.data);
  //     setMessage(result.message);
  //   };

  //   fetchEvent();
  //   if (authToken) {
  //     const fetchRSVPStatus = async () => {
  //       const [status] = await checkUserRSVP(authToken, id);
  //       console.log(rsvpStatus);
  //       setRsvpStatus(status);
  //     };
  //     fetchRSVPStatus();
  //   }
  // }, [id, authToken]);

  useEffect(() => {
    fetchEvent();
    fetchRSVPStatus();
    // fetchAttendees();
  }, [id, authToken]);

  useEffect(() => {
    // devLog("updated attendees array:", currentAttendees);
  }, [currentAttendees]);

  useEffect(() => {
    if (event?.start_time && event?.end_time) {
      setFormattedTimes(formatDateTime(event.start_time, event.end_time));
    }

    // devLog(formattedTimes);
  }, [event]);

  useEffect(() => {
    const getAttendees = async () => {
      const count = await fetchAttendees(authToken, id);
      setCurrentAttendees(count);
    };
    getAttendees();
  }, [authToken, id]);

  const fetchEvent = async () => {
    const [result] = await viewSingleEventApi(id);
    // devLog(result);
    setEvent(result.data);
    setMessage(result.message);
    setCoverPhotoUrl(result.cover_photo_url);
  };

  const fetchRSVPStatus = async () => {
    if (!authToken) return;

    const [status] = await checkUserRSVP(authToken, id);
    // devLog(status);
    setRsvpStatus(status);
  };

  // moved into fetchAttendees.js utilities file
  // const fetchAttendees = async () => {
  //   const result = await showEventAttendees(authToken, id);
  //   // devLog("result", result);
  //   // devLog(result.length);
  //   // const attendeesArray = result || [];
  //   setCurrentAttendees(result[0]);
  //   devLog("currentAttendees array", currentAttendees);
  // };

  const handleSignUp = async () => {
    const [result] = await attendeeSignUp(authToken, id);

    devLog(result);
    setSuccessMessage(result.message);
    fetchRSVPStatus();
  };

  const handleCancelSignUp = async () => {
    const [result] = await cancelSignUp(authToken, id);
    devLog(result);
    setSuccessMessage(result.message);
    fetchRSVPStatus();
  };

  const allAttendees = currentAttendees.map((attendee) => (
    <div id={attendee.user_id} key={attendee.user_id} className="flex">
      <p>@{attendee.first_name || "anonymous user"}</p>
    </div>
  ));

  // const allEvents = userEvents.map((event) => (
  //   <div id={event.id} key={event.id} className="flex ">
  //     <Link
  //       to={`/update/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}
  //     >
  //       {event.title}
  //     </Link>
  //     <p className="mx-2">|</p>
  //     <p>{event.start_time}</p>
  //   </div>
  // ));

  // const noAttendees = (
  //   <div>
  //     <p>you don't have any upcoming events</p>
  //   </div>
  // );

  // const allEvents = events.map((event) => (
  //   <div id={event.id} key={event.id}>
  //     <div className="block  bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white  ">
  //       <Link to={`/${event.title.replace(/\s+/g, "-")}`}>{event.title}</Link>
  //     </div>
  //   </div>
  // ));

  // const noEvents = (
  //   <div>
  //     <p>no events available</p>
  //   </div>
  // );

  return (
    <div className={styles.viewEvent}>
      <div className={styles.fullPage}>
        {/* <div className={styles.backButton}>
          <Link to={"/allEvents"}>back</Link>
        </div> */}
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          back
        </button>
        {coverPhotoUrl ? (
          <img
            src={coverPhotoUrl}
            alt={`${event.title} Cover`}
            className={styles.realImage}
          />
        ) : (
          <div className={styles.image}></div>
        )}
        <div className={styles.eventCard}>
          <div className={styles.header}>
            <h1>{event.title}</h1>
            <div>
              {rsvpStatus.creator ? (
                <button
                  onClick={() =>
                    navigate(
                      `/update/${event.title.replace(/\s+/g, "-")}/event/${
                        event.id
                      }`
                    )
                  }
                  id="button-2"
                >
                  edit
                </button>
              ) : rsvpStatus.attending ? (
                <button onClick={handleCancelSignUp} id="button-2">
                  cancel rsvp
                </button>
              ) : rsvpStatus.attending === false ? (
                <button onClick={handleSignUp} id="button-2">
                  rsvp
                </button>
              ) : (
                <button onClick={() => navigate("/login")} id="button-2">
                  sign in to rsvp
                </button>
              )}
            </div>
          </div>
          <div className={styles.allEventDetails}>
            <div className={styles.leftColumn}>
              <div className={styles.singleDetail}>
                <h2>Location</h2>
                <p>{event.location}</p>
              </div>
              <div className={styles.singleDetail}>
                <h2>Date & Time</h2>
                <div>
                  <p>{formattedTimes.formattedDate}</p>
                  <p>
                    {formattedTimes.formattedStartTime} -{" "}
                    {formattedTimes.formattedEndTime}
                  </p>
                </div>
              </div>
              {/* {authToken && (
                <button
                  onClick={handleSignUp}
                  className="bg-black text-white rounded-full px-6 m-2"
                >
                  {isAttending ? "Cancel RSVP" : "RSVP"}
                </button>
              )} */}
              <div className={styles.singleDetail}>
                <h2>Description</h2>
                <p>{event.description}</p>
              </div>
            </div>
            <div className={styles.rightColumn}>
              {authToken ? (
                <div className={styles.singleDetail}>
                  <div className={styles.sideBySide}>
                    <h2>Attending</h2>
                    <p>({currentAttendees.length})</p>
                  </div>
                  {allAttendees}
                </div>
              ) : currentAttendees.length < 1 ? (
                <p>nobody has RSVP'd up yet</p>
              ) : currentAttendees.length === 1 ? (
                <p>1 person has signed up</p>
              ) : (
                <p>{currentAttendees.length} people have signed up</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleEvent;
