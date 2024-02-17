// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/home';
import Notes from './components/notes';
import Sidebar from './components/sidebar';

function App() {
  const [activeComponent, setActiveComponent] = useState('home');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);

  const handleClickMe = () => {
    // Set the active component to 'notes' when the button is clicked
    setActiveComponent('notes');
  };

  const handleGroupClicked = (group) => {
    // Set the selected group and switch to 'notes' component
    setSelectedGroup(group);
    setActiveComponent('notes');
  };

  const handleUpdateNotes = (updatedNotes) => {
    if (selectedGroup) {
      const updatedGroup = { ...selectedGroup, notes: updatedNotes };

      // Update the state with the updated group
      setGroups(prevGroups => {
        return prevGroups.map(group => (group.name === selectedGroup.name ? updatedGroup : group));
      });

      // Save the updated groups to local storage
      saveGroupsToLocalStorage();
    }
  };

  const saveGroupsToLocalStorage = () => {
    localStorage.setItem('groups', JSON.stringify(groups));
  };

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onClickMe={handleClickMe} onGroupClicked={handleGroupClicked} onUpdateNotes={handleUpdateNotes} groups={groups} />
      <div style={{ flex: 1 }}>
        {activeComponent === 'home' ? <Home /> : <Notes selectedGroup={selectedGroup} onUpdateNotes={handleUpdateNotes} groups={groups} />}
      </div>
    </div>
  );
}

export default App;
