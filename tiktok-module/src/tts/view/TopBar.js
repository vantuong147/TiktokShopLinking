import React, { useState, useEffect } from 'react';

const TopBar = () => {
  // App keys array (replace with your app keys)
  const appKeys = ['6e2skahs13mp0', 'AppKey2', 'AppKey3'];
  const [selectedAppKey, setSelectedAppKey] = useState(appKeys[0]);

  useEffect(() => {
    // Save the default app key to the cookie on initial load
    document.cookie = `crrAppKey=${selectedAppKey}; path=/`;
  }, [selectedAppKey]);

  const handleHomeClick = () => {
    // Redirect to linkshop page
    window.location.href = '/tts/linkshop';
  };

  const handleAppKeySelect = (e) => {
    const selectedKey = e.target.value;
    setSelectedAppKey(selectedKey);
    // Save selected app key to cookie
    document.cookie = `crrAppKey=${selectedKey}; path=/`;
  };

  return (
    <div className="top-bar">
      <button className="home-button" onClick={handleHomeClick}>Home</button>
      <select
        className="app-key-select"
        value={selectedAppKey}
        onChange={handleAppKeySelect}
      >
        {appKeys.map((key, index) => (
          <option key={index} value={key}>{key}</option>
        ))}
      </select>
    </div>
  );
};

export default TopBar;
