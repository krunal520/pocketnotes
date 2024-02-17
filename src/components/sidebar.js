// Sidebar.js
import React, { useState, useEffect } from 'react';
import "./styles/sidebar.css";

const Sidebar = ({ onClickMe, onGroupClicked, onUpdateNotes, groups: propGroups }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('#000000'); // Default color is black
  const [predefinedColors] = useState(['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF']);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);
  }, [propGroups]);

  const handleEllipseButtonClick = (e) => {
    e.stopPropagation();
    setShowPopup(true);
  };

  const handleCreateGroup = () => {
    if (groupName.trim() !== '') {
      const newGroup = { name: groupName, color: groupColor, notes: [] };
  
      // Update the state with the new group and save to local storage
      setGroups(prevGroups => {
        const updatedGroups = [...prevGroups, newGroup];
        saveGroupsToLocalStorage(updatedGroups);
        return updatedGroups;
      });
  
      setShowPopup(false);
      setGroupName('');
      setGroupColor('#000000');
    }
  };
  

  const handleColorSelection = (color) => {
    setGroupColor(color);
  };

  const handleGroupClicked = (group) => {
    onGroupClicked(group);
  };

  const saveGroupsToLocalStorage = () => {
    localStorage.setItem('groups', JSON.stringify(groups));
  };

  // Get initials from each word of the group name
  const getInitials = (name) => {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase());
    return initials.join('');
  };

  // Close the popup when clicking outside of it
  useEffect(() => {
    const closePopupOnOutsideClick = (event) => {
      if (showPopup && !event.target.closest(".popup")) {
        setShowPopup(false);
      }
    };

    window.addEventListener("click", closePopupOnOutsideClick);

    return () => {
      window.removeEventListener("click", closePopupOnOutsideClick);
    };
  }, [showPopup]);

  return (
    <div style={{ backgroundColor: 'white', width: '24vw', height: '100vh', textAlign: "center", alignItems: "center" }}>
      <h2 className="sidebar-heading">Pocket Notes</h2>
      <div>
        {groups.length === 0 ? (
          <h6 style={{ padding: "50px", fontSize: "20px" }}>No Group Created</h6>
        ) : (
          groups.map((group, index) => (
            <div
              key={index}
              className="group-item"
              style={{ color: group.color, cursor: 'pointer' }}
              onClick={() => handleGroupClicked(group)}
            >
              <div className="circle" style={{ backgroundColor: group.color }}>
                {getInitials(group.name)}
              </div>
              <h6 className="group">{group.name}</h6>
            </div>
          ))
        )}
      </div>
      <div className="ellipse-container">
        <div className="ellipse-button" onClick={handleEllipseButtonClick}>
          <span className="ellipse-icon">+</span>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <span className="popup-heading">Create New group</span> <br />
          <span className="popup-name">Group Name</span>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{ padding: "20px" }}
          />
          <br />
          <span className="popup-name1">Choose Color</span>
          <div className="color-options">
            {predefinedColors.map((color, index) => (
              <div
                key={index}
                className="color-option"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelection(color)}
              ></div>
            ))}
          </div>
          <button onClick={handleCreateGroup}>Create</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
