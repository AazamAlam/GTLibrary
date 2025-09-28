import { useState, useRef } from 'react';
import './Bulletin.css';

const Bulletin = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "Meeting Notes\n• Project deadline\n• Team sync",
      color: "#e1b3ff",
      position: { top: 80, left: 60 },
      rotation: -3,
      tapePosition: { top: -15, left: 15 }
    },
    {
      id: 2,
      content: "Ideas 💡\n• New feature\n• User feedback",
      color: "#b3ffb3",
      position: { top: 80, left: 240 },
      rotation: 2,
      tapePosition: { top: -10, right: 20 }
    },
    {
      id: 3,
      content: "To Do ✓\n□ Code review\n□ Documentation",
      color: "#b3f0ff",
      position: { top: 80, left: 420 },
      rotation: -1,
      tapePosition: { top: -10, left: 25 }
    },
    {
      id: 4,
      content: "Inspiration 🌟\n\"Small things together\"",
      color: "#ffcccc",
      position: { top: 250, left: 60 },
      rotation: 4,
      tapePosition: { top: -10, left: 20 }
    },
    {
      id: 5,
      content: "Quick Links\n• Design system\n• API docs",
      color: "#fff3b3",
      position: { top: 250, left: 240 },
      rotation: -2,
      tapePosition: { top: -15, left: 15 }
    },
    {
      id: 6,
      content: "Resources 📚\n• Templates\n• Guidelines",
      color: "#d1ffb3",
      position: { top: 250, left: 420 },
      rotation: 1,
      tapePosition: { top: -10, right: 15 }
    }
  ]);

  const [dragState, setDragState] = useState({
    isDragging: false,
    currentNote: null,
    offset: { x: 0, y: 0 }
  });

  const boardRef = useRef(null);
  const colors = ['#e1b3ff', '#b3ffb3', '#b3f0ff', '#ffcccc', '#fff3b3', '#ffd1b3', '#d1ffb3', '#b3d1ff'];

  const handleMouseDown = (e, noteId) => {
    if (e.target.classList.contains('delete-btn') || e.target.tagName === 'TEXTAREA') return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();
    
    setDragState({
      isDragging: true,
      currentNote: noteId,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });
  };

  const handleMouseMove = (e) => {
    if (!dragState.isDragging || !dragState.currentNote) return;
    
    const boardRect = boardRef.current.getBoundingClientRect();
    let x = e.clientX - boardRect.left - dragState.offset.x;
    let y = e.clientY - boardRect.top - dragState.offset.y;
    
    // Keep notes within bounds
    x = Math.max(0, Math.min(x, boardRect.width - 150));
    y = Math.max(0, Math.min(y, boardRect.height - 150));
    
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === dragState.currentNote
          ? { ...note, position: { top: y, left: x } }
          : note
      )
    );
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      currentNote: null,
      offset: { x: 0, y: 0 }
    });
  };

  const addNote = () => {
    const newNote = {
      id: Math.max(...notes.map(n => n.id)) + 1,
      content: "New Note\nAdd text here...",
      color: colors[Math.floor(Math.random() * colors.length)],
      position: {
        top: Math.random() * (400 - 120) + 60,
        left: Math.random() * (700 - 120) + 50
      },
      rotation: (Math.random() - 0.5) * 10,
      tapePosition: { top: -10, left: 20 }
    };
    
    setNotes([...notes, newNote]);
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const updateNoteContent = (noteId, content) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId ? { ...note, content } : note
      )
    );
  };

  const getNoteStyle = (note) => ({
    backgroundColor: note.color,
    top: `${note.position.top}px`,
    left: `${note.position.left}px`,
    transform: dragState.currentNote === note.id 
      ? 'scale(1.1)' 
      : `rotate(${note.rotation}deg)`
  });

  const getTapeStyle = (tapePosition) => ({
    ...tapePosition
  });

  return (
    <div className="board-container">
      <div
        ref={boardRef}
        className="cork-board"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="board-title">
          Project Board
        </div>

        {notes.map((note) => (
          <div
            key={note.id}
            className={`sticky-note ${dragState.currentNote === note.id ? 'dragging' : ''}`}
            style={getNoteStyle(note)}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
          >
            <div className="tape" style={getTapeStyle(note.tapePosition)} />

            <button
              className="delete-btn"
              onClick={() => deleteNote(note.id)}
            >
              ×
            </button>

            <textarea
              className="note-textarea"
              value={note.content}
              onChange={(e) => updateNoteContent(note.id, e.target.value)}
              placeholder="Click to edit..."
            />
          </div>
        ))}

        <button
          className="add-note-btn"
          onClick={addNote}
        >
          + Add Note
        </button>
      </div>
    </div>
  );
};

export default Bulletin;