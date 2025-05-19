export const formatDateTime = (startDateTime, endDateTime) => {
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);

  const formattedDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedStartTime = startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndTime = endDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    formattedDate,
    formattedStartTime,
    formattedEndTime,
  };
};
