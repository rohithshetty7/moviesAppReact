import React from "react";
import moment from "moment";

const RecommendationList = ({ recommendations }) => {
  // Check if there are no movie recommendations available
  if (!recommendations?.data?.success) {
    return <span>No movie recommendations available.</span>;
  }

  return (
    <ul>
      {recommendations?.data?.data?.map((movie, index) => (
        <li key={index}>
          {movie.name}, showing at {" "}
          {movie.showings.map((time, idx) => (
            <span key={idx}>{formatTime(time) + " "}</span>
          ))}
        </li>
      ))}
    </ul>
  );
};

// Function to format time to "hh:mm AM/PM" format
const formatTime = (timeString) => {
  const time = moment(timeString, "HH:mm:ssZ").utcOffset(timeString);
  return time.format("h:mm A");
};

export default RecommendationList;
