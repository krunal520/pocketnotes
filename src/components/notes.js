// notes.js
import React, { useState, useEffect } from 'react';
import "./styles/notes.css";

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
        saveGroupsToLocalStorage(groups.map(group => (group.name === selectedGroup.name ? updatedGroup : group)));
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
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return new Date().toLocaleString('en-US', options);
  };

  const getGroupInitials = (name) => {
    const words = name.split(' ');
    let initials = [];

    for (let i = 0; i < Math.min(2, words.length); i++) {
      const word = words[i];
      initials.push(word.charAt(0).toUpperCase());
    }

    return initials.join('');

  };

  return (
    <div className='notes'>
      <div className='selectedGroup'>
        {selectedGroup ? (
          <>
            <span className='group-initial' style={{
              backgroundColor: selectedGroup.color
            }}>
              {getGroupInitials(selectedGroup.name)}
            </span>
            <span className='selectedGroup-name'>{selectedGroup.name}</span>
          </>
        ) : (
          'Pocket Notes'
        )}
      </div>

      {/* Add Note Form */}
      <div className='note-content'>
        <textarea
          className='text-area'
          placeholder="Enter your text here..........."
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
        />
        <button
          onClick={handleAddNote}
          className='notes-button'
          style={{
            backgroundColor: newNoteContent.trim() === '' ? '#ABABAB' : '#001F8B',
            cursor: newNoteContent.trim() === '' ? 'not-allowed' : 'pointer',
          }}
          disabled={newNoteContent.trim() === ''}
        >
          ➔
        </button>
      </div>

      {/* Display Notes */}
      {notes.length === 0 ? (
        <p style={{ marginTop: '200px' }}>No notes available for this group.</p>
      ) : (
        notes.map((note, index) => (
          <div key={index} style={{ backgroundColor: 'white', margin: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <p style={{ marginBottom: '8px', fontSize: '16px' }}>{note.content}</p>
            <p style={{ fontSize: '12px', color: '#888' }}>{` ${note.timestamp}`}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;
