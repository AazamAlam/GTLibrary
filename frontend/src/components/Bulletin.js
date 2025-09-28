import { useState, useRef } from 'react';
import './Bulletin.css';

// Integrated StickyNote Form Component
const StickyNoteForm = ({ onSubmit, onCancel, previewColor }) => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    if (!name || !topic || !capacity) return;
    onSubmit({ name, topic, capacity, location, time });
    setName('');
    setTopic('');
    setCapacity('');
    setLocation('');
    setTime('');
  };

  // Convert hex color to gradient
  const getGradientFromHex = (hexColor) => {
    const lighten = (color, amount) => {
      const num = parseInt(color.replace("#", ""), 16);
      const r = Math.min(255, Math.floor((num >> 16) + amount));
      const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + amount));
      const b = Math.min(255, Math.floor((num & 0x0000FF) + amount));
      return `rgb(${r}, ${g}, ${b})`;
    };
    
    const darken = (color, amount) => {
      const num = parseInt(color.replace("#", ""), 16);
      const r = Math.max(0, Math.floor((num >> 16) - amount));
      const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) - amount));
      const b = Math.max(0, Math.floor((num & 0x0000FF) - amount));
      return `rgb(${r}, ${g}, ${b})`;
    };

    const light = lighten(hexColor, 20);
    const base = hexColor;
    const dark = darken(hexColor, 20);
    
    return `linear-gradient(150deg, ${light} 0%, ${base} 50%, ${dark} 100%)`;
  };

  return (
    <div className="sticky-form-container">
      <div 
        className="sticky-form-note"
        style={{ background: getGradientFromHex(previewColor) }}
      >
        <div className="form-tape"></div>
        <div className="form-content">
          <div className="form-field-group">
            <div className="form-label">Topic:</div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter the topic"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-field-group">
            <div className="form-label">Name:</div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-field-group">
            <div className="form-label">Capacity:</div>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="5"
              min="1"
              max="100"
              className="form-input"
              required
            />
          </div>

          <div className="form-field-group">
            <div className="form-label">Location:</div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Library Room 205"
              className="form-input"
            />
          </div>

          <div className="form-field-group">
            <div className="form-label">Time:</div>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="3:00 PM - 5:00 PM"
              className="form-input"
            />
          </div>

          <div className="form-button-group">
            <button onClick={handleSubmit} className="form-submit-btn">
              Post Note
            </button>
            <button onClick={onCancel} className="form-cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StudentBulletinBoard() {
  const [notes, setNotes] = useState([
    /*
    {
      id: 1,
      content: "Study Group 📚\nMath - Sarah\nCapacity: 4/5\n📍 Library Room 205\n🕐 3:00 PM - 5:00 PM",
      color: "#e1b3ff",
      position: { top: 120, left: 80 },
      rotation: -3,
      tapePosition: { top: -15, left: 15 },
      studentData: { name: "Sarah", topic: "Math", capacity: "5", location: "Library Room 205", time: "3:00 PM - 5:00 PM" }
    },
    {
      id: 2,
      content: "Project Team 💡\nWeb Dev - Alex\nCapacity: 2/3\n📍 Tech Lab B\n🕐 6:00 PM - 8:00 PM",
      color: "#b3ffb3",
      position: { top: 120, left: 280 },
      rotation: 2,
      tapePosition: { top: -10, right: 20 },
      studentData: { name: "Alex", topic: "Web Dev", capacity: "3", location: "Tech Lab B", time: "6:00 PM - 8:00 PM" }
    }
    */
  ]);

  const [dragState, setDragState] = useState({
    isDragging: false,
    currentNote: null,
    offset: { x: 0, y: 0 }
  });

  const [showForm, setShowForm] = useState(false);
  const [formColor, setFormColor] = useState('#fff3b3');
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
    
    x = Math.max(0, Math.min(x, boardRect.width - 150));
    y = Math.max(70, Math.min(y, boardRect.height - 150));
    
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

  const handleFormSubmit = (formData) => {
    const locationText = formData.location ? `\n📍 ${formData.location}` : '';
    const timeText = formData.time ? `\n🕐 ${formData.time}` : '';
    
    const newNote = {
      id: Math.max(...notes.map(n => n.id), 0) + 1,
      content: `${formData.topic} 📌\n${formData.name}\nCapacity: ${formData.capacity}${locationText}${timeText}`,
      color: formColor,
      position: {
        top: Math.random() * (300 - 120) + 120,
        left: Math.random() * (600 - 120) + 80
      },
      rotation: (Math.random() - 0.5) * 10,
      tapePosition: { top: -10, left: 20 },
      studentData: formData
    };
    
    setNotes([...notes, newNote]);
    setShowForm(false);
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
      ? 'scale(1.05)' 
      : `rotate(${note.rotation}deg)`,
    zIndex: dragState.currentNote === note.id ? 1000 : 1
  });

  const getTapeStyle = (tapePosition) => ({
    ...tapePosition
  });

  return (
    <div className="bulletin-board-container">
      <div
        ref={boardRef}
        className="cork-board"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="board-title">
          Student Study Groups
        </div>

        {notes.map((note) => (
          <div
            key={note.id}
            className={`board-sticky-note ${dragState.currentNote === note.id ? 'dragging' : ''}`}
            style={getNoteStyle(note)}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
          >
            <div 
              className="tape-on-board" 
              style={getTapeStyle(note.tapePosition)} 
            />

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
          className="add-note-button"
          onClick={() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setFormColor(randomColor);
            setShowForm(true);
          }}
        >
          + Add Study Group
        </button>
      </div>

      {showForm && (
        <>
          <div className="form-overlay" onClick={() => setShowForm(false)} />
          <StickyNoteForm 
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            previewColor={formColor}
          />
        </>
      )}
    </div>
  );
}