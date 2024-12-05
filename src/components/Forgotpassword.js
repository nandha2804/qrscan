import React, { useState } from "react";
import axios from "axios";  // Make sure axios is installed to make API requests

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");  // For displaying success or error message
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      // Send email to your backend for password reset request
      const response = await axios.post("/api/auth/forgot-password", { email });

      // Handle success
      if (response.data.success) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        setMessage("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div>
          <label htmlFor="email" style={{ display: "block", marginBottom: "8px" }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        {message && <p style={{ color: loading ? "blue" : "green" }}>{message}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px" }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
