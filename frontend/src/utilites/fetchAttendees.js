import { showEventAttendees } from "../apis/attendees";

export const fetchAttendees = async (authToken, eventId) => {
  const result = await showEventAttendees(authToken, eventId);
  return result[0];
};
