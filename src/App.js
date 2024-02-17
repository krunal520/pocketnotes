import React, { useState } from 'react';
import './App.css';
import Home from './components/home';
import Notes from './components/notes';
import Sidebar from './components/sidebar';

function App() {
  const [activeComponent, setActiveComponent] = useState('home');
  const [selectedGroup, setSelectedGroup] = useState(null);

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
      setSelectedGroup({ ...selectedGroup, notes: updatedNotes });
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onClickMe={handleClickMe} onGroupClicked={handleGroupClicked} onUpdateNotes={handleUpdateNotes} />
      <div style={{ flex: 1 }}>
        {activeComponent === 'home' ? <Home /> : <Notes selectedGroup={selectedGroup} />}
      </div>
    </div>
  );
}

export default App;