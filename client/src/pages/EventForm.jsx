// client/src/pages/EventForm.jsx
import React, { useState, useContext } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { AuthContext } from '../context/AuthContext';

function EventForm() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    category: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.isAnonymous) {
      alert("Only registered users can create events.");
      return;
    }
    try {
      await addDoc(collection(db, "events"), {
        ...formData,
        date: new Date(formData.date).toISOString(),
        owner: user.uid,
        attendees: [],
        createdAt: serverTimestamp()
      });
      navigate('/');
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Event Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <label>Description:</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
            ></textarea>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <label>Date/Time:</label>
            <input 
              type="datetime-local" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <label>Category:</label>
            <input 
              type="text" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
            />
          </div>
          <button type="submit" style={{ marginTop: '1rem' }}>Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
