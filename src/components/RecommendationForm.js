import React, { useState } from 'react';
import axios from 'axios';

const RecommendationForm = ({ onRecommendations }) => {
  const [formData, setFormData] = useState({ genre: '', time: '' });
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidTimeFormat(formData.time)) {
      setValidationError('Please enter time in 24-hour format (HH:MM)');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/movies/recommendations', formData);
      onRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error.message);
    } finally {
      setLoading(false);
      setValidationError('');
    }
  };

  // Function to validate time format
  const isValidTimeFormat = (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // Updated regex to consider only hours and minutes
    return regex.test(time);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Genre:</label>
      <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
      <label>Time:</label>
      <input type="text" name="time" value={formData.time} onChange={handleChange} />
      <button type="submit" disabled={loading}>Get Recommendations</button>
      {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
    </form>
  );
};

export default RecommendationForm;
