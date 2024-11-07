import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
        setError("Failed to fetch users. Please try again.");
      });
  }, []);

  return (
    <div className="users-container">
      {error && <p className="error">{error}</p>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div key={user.username} className="user-box">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="user-avatar"
            />
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>Username: {user.username}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
