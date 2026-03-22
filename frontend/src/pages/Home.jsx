import { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setError("Please login to view your complaints");
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/complaints/my/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setComplaints(data);
          setError(null);
        } else if (res.status === 401) {
          localStorage.removeItem("token");
          setError("Session expired. Please login again.");
        } else {
          const errorData = await res.json();
          setError(errorData.detail || "Failed to load complaints");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "submitted":
        return "pending";
      case "approved":
      case "in_progress":
        return "in-progress";
      case "resolved":
        return "resolved";
      default:
        return "pending";
    }
  };

  const formatStatus = (status) => {
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="menu active">📄 Complaints</div>
        <div className="menu">👥 Community</div>
        <div className="menu">📅 Govt Events</div>
        <div className="menu">📢 Awareness</div>
        <div className="menu">❓ Support</div>
      </div>

      <div className="main">
        <div className="fixed-header">
          <div className="hero">
            <h1>My Complaints</h1>
            <button className="new-btn">+ New Complaint</button>
          </div>

          <div className="filters">
            <select>
              <option>Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        <div className="cards">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{color: 'red'}}>{error}</p>
          ) : complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            complaints.map((complaint) => (
              <div className="card" key={complaint.id}>
                <span className={`status ${getStatusClass(complaint.status)}`}>
                  {formatStatus(complaint.status)}
                </span>

                <h3>{complaint.title}</h3>

                <div className="info">
                  <span>📍 {complaint.city}, {complaint.state}</span>
                </div>

                <button className="track">Track</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
