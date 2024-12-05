/*import axios from "axios";

// Base URL for the backend API
const API_URL = "http://localhost:8080/admin"; // Change this to your backend URL if different

// Function to get all users (candidates)
export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data; // Returns list of candidates
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

// Function to get all absentees for a specific date
export const getAbsentees = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/absentees?date=${date}`);
    return response.data; // Returns list of absentees
  } catch (error) {
    console.error("Error fetching absentees:", error);
    throw error;
  }
};

// Function to get all leave requests
export const getLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/leaves`);
    return response.data; // Returns list of leave requests
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    throw error;
  }
};*/

import axios from "axios";

const API_URL = "http://localhost:8080/admin"; // Update with your backend URL

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getAbsentees = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/absentees?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching absentees:", error);
    throw error;
  }
};

export const getLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/leaves`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    throw error;
  }
};

