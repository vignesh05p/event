// client/src/pages/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/eventcard';
import Navbar from '../components/navbar';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ category: '', date: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, "events"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsData = [];
      querySnapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsData);
    });
    return () => unsubscribe();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredEvents = events.filter((event) => {
    const categoryMatch = filters.category
      ? event.category?.toLowerCase().includes(filters.category.toLowerCase())
      : true;
    const dateMatch = filters.date
      ? new Date(event.date).toISOString().slice(0, 10) === filters.date
      : true;
    return categoryMatch && dateMatch;
  });

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h2>User Dashboard</h2>
        <div className="filters">
          <div>
            <label>Category:</label>
            <input 
              type="text" 
              name="category" 
              placeholder="Enter category" 
              value={filters.category} 
              onChange={handleFilterChange} 
            />
          </div>
          <div>
            <label>Date:</label>
            <input 
              type="date" 
              name="date" 
              value={filters.date} 
              onChange={handleFilterChange} 
            />
          </div>
        </div>
        <div className="events">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} currentUser={user} />
            ))
          ) : (
            <p className="no-events">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
