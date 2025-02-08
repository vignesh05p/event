// client/src/components/EventCard.jsx
import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../firebase';

function EventCard({ event, currentUser }) {
  const [updating, setUpdating] = useState(false);

  // Determine if the user has already joined the event
  const isJoined = currentUser && event.attendees && event.attendees.includes(currentUser.uid);

  const handleJoin = async () => {
    if (!currentUser || currentUser.isAnonymous) {
      alert("Only registered users can join events.");
      return;
    }
    setUpdating(true);
    const eventRef = doc(db, "events", event.id);
    try {
      await updateDoc(eventRef, {
        attendees: arrayUnion(currentUser.uid)
      });
    } catch (error) {
      console.error("Error joining event:", error);
    }
    setUpdating(false);
  };

  const handleLeave = async () => {
    setUpdating(true);
    const eventRef = doc(db, "events", event.id);
    try {
      await updateDoc(eventRef, {
        attendees: arrayRemove(currentUser.uid)
      });
    } catch (error) {
      console.error("Error leaving event:", error);
    }
    setUpdating(false);
  };

  return (
    <div className="event-card">
      <h4>{event.name}</h4>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      {event.category && <p>Category: {event.category}</p>}
      <p>Attendees: {event.attendees ? event.attendees.length : 0}</p>
      {currentUser && !currentUser.isAnonymous && (
        isJoined ? (
          <button className="button" onClick={handleLeave} disabled={updating}>
            Leave Event
          </button>
        ) : (
          <button className="button" onClick={handleJoin} disabled={updating}>
            Join Event
          </button>
        )
      )}
    </div>
  );
}

export default EventCard;
