// src/GitHubSearch.js
import React, { useState } from 'react';
import './GitHubSearch.css';

const GitHubSearch = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error('User not found. Please enter a valid GitHub username.');
      }

      const data = await response.json();
      setUserData(data);
      setError(null);
      setUsername('');
    } catch (error) {
      setUserData(null);
      setError(error.message);
    }
  };

  return (
    <div className="github-search-container">
      <h1 className="app-title">GitHub User Search</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="username-input"
        />
        <button onClick={fetchUserData} className="search-button">
          Search
        </button>
      </div>

      {userData && (
        <div className="user-info">
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} className="user-avatar" />
          <h2 className="user-login">{userData.login}</h2>
          <p className="follower-count">Followers: {userData.followers}</p>
          <p className="following-count">Following: {userData.following}</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default GitHubSearch;
