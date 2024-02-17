import React, { useState, useEffect } from "react";
import "./styles/notes.css";

const Sidebar = ({ onClickMe, onGroupClicked }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('#000000'); // Default color is black
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);

  const predefinedColors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  // Load groups from local storage on component mount
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);
  }, []);

  const handleEllipseButtonClick = (e) => {
    e.stopPropagation();
    setShowPopup(true);
  };

  const handleCreateGroup = () => {
    if (groupName.trim() !== '') {
      const newGroup = { name: groupName, color: groupColor, notes: [] };

      // Update the state with the new group
      setGroups([...groups, newGroup]);

      // Save groups to local storage
      saveGroupsToLocalStorage([...groups, newGroup]);

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
    setSelectedGroup(group);
  };

  const saveGroupsToLocalStorage = (updatedGroups) => {
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  };

  // Get initials from each word of the group name
  const getInitials = (name) => {
    const words = name.split(' ');
    let initials = [];

    for (let i = 0; i < Math.min(2, words.length); i++) {
      const word = words[i];
      initials.push(word.charAt(0).toUpperCase());
    }

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
    <div className="sidebar">
      <h2 className="sidebar-heading">Pocket Notes</h2>
      <div>
        {groups.length === 0 ? (
          <h6 className="no-group">No Group Created</h6>
        ) : (
          groups.map((group, index) => (
            <div
              key={index}
              className={`group-item ${selectedGroup && selectedGroup.name === group.name ? 'selected-group' : ''}`}
              style={{ cursor: 'pointer' }}
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
