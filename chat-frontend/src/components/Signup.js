import React, { useState } from "react";
import { signup } from "./authService"; // Import the signup function from authService
import { Link } from "react-router-dom"; // Import Link for navigation

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await signup(username, email, password);
      setSuccess("Signup successful! You can now log in.");
      console.log("Signup response:", response);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Signup</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Signup</button>
        </form>
        {error && <p style={{ ...styles.message, color: "red" }}>{error}</p>}
        {success && <p style={{ ...styles.message, color: "white" }}>{success}</p>}
        <p style={styles.linkText}>
          Already have an account? <Link to="/" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#1a202c",  // bg-gray-900
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "400px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#2d3748",  // bg-gray-800
    color: "#e2e8f0",  // text-gray-100
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#81e6d9",  // teal-300 for the title
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    display: "block",
    fontWeight: "bold",
    color: "#cbd5e0",  // text-gray-300
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #4a5568",  // gray-700 border
    backgroundColor: "#2d3748",  // bg-gray-800
    color: "#e2e8f0",  // text-gray-100
  },
  button: {
    padding: "10px",
    backgroundColor: "#3182ce",  // blue-600
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  },
  message: {
    marginTop: "10px",
    textAlign: "center",
  },
  linkText: {
    marginTop: "15px",
    textAlign: "center",
  },
  link: {
    color: "#63b3ed",  // blue-400
    textDecoration: "none",
  },
};

export default Signup;
