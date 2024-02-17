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
    setActiveComponent('notes');
  };

  const handleGroupClicked = (group) => {
    setSelectedGroup(group);
    setActiveComponent('notes');
  };

  const handleUpdateNotes = (updatedNotes) => {
    if (selectedGroup) {
      const updatedGroup = { ...selectedGroup, notes: updatedNotes };

      setGroups(prevGroups => {
        return prevGroups.map(group => (group.name === selectedGroup.name ? updatedGroup : group));
      });

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
