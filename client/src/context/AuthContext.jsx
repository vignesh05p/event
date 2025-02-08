// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  signInAnonymously 
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const register = async (email, password, username) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Optionally, update profile with a display name here using updateProfile
      return res.user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      return res.user;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  const guestLogin = async () => {
    try {
      // Firebase supports anonymous auth; alternatively, simulate a guest user.
      const res = await signInAnonymously(auth);
      return res.user;
    } catch (error) {
      console.error("Guest login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, signInWithGoogle, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
