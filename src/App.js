import React, { useState } from "react";
import RecommendationForm from "./components/RecommendationForm";
import RecommendationList from "./components/RecommendationList";

const App = () => {
  const [recommendations, setRecommendations] = useState([]);
  const handleRecommendations = (data) => {
    setRecommendations(data);
  };

  return (
    <div>
      <h1>Movie Recommendation App</h1>
      <RecommendationForm onRecommendations={handleRecommendations} />
      <RecommendationList recommendations={recommendations} />
    </div>
  );
};

export default App;
