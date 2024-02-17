// Notes.js
import React, { useState, useEffect } from 'react';
const Notes = ({ selectedGroup, onUpdateNotes, groups }) => {
  const [newNoteContent, setNewNoteContent] = useState('');
  const [notes, setNotes] = useState(selectedGroup ? selectedGroup.notes : []);

  useEffect(() => {
    setNotes(selectedGroup ? selectedGroup.notes : []);
  }, [selectedGroup]);

  const handleAddNote = () => {
    if (newNoteContent.trim() !== '') {
      const newNote = {
        content: newNoteContent,
        timestamp: formatTimestamp(),
      };

      setNotes([...notes, newNote]);

      if (selectedGroup) {
        const updatedGroup = { ...selectedGroup, notes: [...selectedGroup.notes, newNote] };
        onUpdateNotes(updatedGroup.notes);

        // Save the updated groups to local storage
        saveGroupsToLocalStorage([...groups, updatedGroup]);
      }

      setNewNoteContent('');
    }
  };

  const saveGroupsToLocalStorage = (updatedGroups) => {
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  };

  const formatTimestamp = () => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return new Date().toLocaleString('en-US', options);
  };

  const getGroupInitials = (name) => {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase());
    return initials.join('');
  };

  return (
    <div style={{ backgroundColor: '#DAE5F5', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', backgroundColor: "#001F8B", height: "60px" }}>
        {selectedGroup ? (
          <>
            <span style={{
              backgroundColor: selectedGroup.color,
              display: 'flex',
              marginTop: '6px',
              marginLeft: '6px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              {getGroupInitials(selectedGroup.name)}
            </span>
            <span style={{ marginLeft: '10px', marginTop: '10px', color: "white" }}>{selectedGroup.name}</span>
          </>
        ) : (
          'Pocket Notes'
        )}
      </div>

      {/* Add Note Form */}
      <div className='note-content' style={{ backgroundColor: "#001F8B" }}>
        <textarea
          style={{ width: "100%", height: "70%", marginLeft: "10px", marginRight: "10px" }}
          placeholder="Note Content"
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
        />
        <button onClick={handleAddNote} style={{
          position: 'absolute',
          marginRight: '10px',
          top: '80px',
          right: '10px',
          backgroundColor: '#ABABAB',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          cursor: 'pointer',
          borderRadius: '5px'
        }} > ➔</button>
      </div>

      {/* Display Notes */}
      {notes.length === 0 ? (
        <p style={{ marginTop: '200px' }}>No notes available for this group.</p>
      ) : (
        notes.map((note, index) => (
          <div key={index} style={{ backgroundColor: 'white', margin: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <p style={{ marginBottom: '8px', fontSize: '16px' }}>{note.content}</p>
            <p style={{ fontSize: '12px', color: '#888' }}>{`Created on: ${note.timestamp}`}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;
