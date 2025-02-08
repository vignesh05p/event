
# Project Title

A brief description of what this project does and who it's for


# Event Management Platform

A full-stack event management platform where users can register, log in (using Email/Password, Google, or Guest Login), create events, and view/join events in real time. This project features a responsive design with a polished white, black, and light blue color palette.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Firebase Configuration](#firebase-configuration)
- [Folder Structure](#folder-structure)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

This Event Management Platform allows users to:
- **Register/Login** using Email/Password, Google Sign-In, or Guest Login.
- **Create Events** with details such as event name, description, date/time, and category.
- **View a Dashboard** displaying upcoming and past events with filtering options.
- **Join/Leave Events** with real-time attendee count updates using Firestore's real-time listeners.
- Enjoy a **Responsive UI** styled in a clean white, black, and light blue theme.

## Features

- **User Authentication:** Secure login using Firebase Authentication (Email/Password, Google, Anonymous/Guest).
- **Event Creation:** Create new events with a detailed form.
- **Real-Time Updates:** Live updates for events and attendee counts using Firestore.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Polished UI:** Clean styling using white, black, and light blue color schemes.

## Tech Stack

- **Frontend:** React, Vite, CSS (Global CSS and CSS Modules)
- **Backend:** Firebase (Authentication & Firestore)
- **Deployment:** Can be deployed using Vercel, Netlify, or similar services

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/event-management-platform.git
   cd event-management-platform/client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create your Firebase project:**

   - Visit the [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Add a Web App to the project to obtain your Firebase configuration.

4. **Configure Firebase:**

   - In the `client/src` directory, create or update `firebase.js` with your Firebase configuration:

     ```js
     // client/src/firebase.js
     import { initializeApp } from "firebase/app";
     import { getAuth, GoogleAuthProvider } from "firebase/auth";
     import { getFirestore } from "firebase/firestore";

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     const app = initializeApp(firebaseConfig);
     const auth = getAuth(app);
     const provider = new GoogleAuthProvider();
     const db = getFirestore(app);

     export { auth, provider, db };
     ```

5. **Enable Firebase Authentication and Firestore:**

   - In your Firebase Console, enable Email/Password, Google, and Anonymous Authentication.
   - Set up a Firestore database.

## Firebase Configuration

After creating a Firebase project and adding a web app, you'll receive a configuration object similar to:

```js
const firebaseConfig = {
  apiKey: "AIzaSyD***************",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

Replace the placeholder values in your `firebase.js` file with these values.

## Folder Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        // Navigation bar with links and logout
│   │   └── EventCard.jsx     // Component to display event details & join/leave functionality
│   ├── context/
│   │   └── AuthContext.jsx   // Firebase authentication context
│   ├── pages/
│   │   ├── Dashboard.jsx     // Event dashboard with filters & real‑time updates
│   │   ├── Login.jsx         // Login page (with Google sign‑in & guest login)
│   │   ├── Register.jsx      // Registration page
│   │   └── EventForm.jsx     // Event creation form
│   ├── firebase.js           // Firebase configuration & initialization
│   ├── index.css             // Global CSS styles
│   ├── App.jsx               // Route definitions
│   └── main.jsx              // React entry point
├── package.json
└── vite.config.js
```

## Running the Project

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Access the application:**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Deployment

- **Frontend:**  
  Deploy the frontend to services like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

- **Firebase Hosting (Optional):**  
  You can also deploy your project using [Firebase Hosting](https://firebase.google.com/docs/hosting).

Ensure you update your Firebase configuration and API endpoints if necessary when deploying.

