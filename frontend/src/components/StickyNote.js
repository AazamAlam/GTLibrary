import { useState } from 'react';
import './StickyNote.css';

const StickyNote = () => {
    const [name, setName] = useState('');
    const [topic, setTopic] = useState('');
    const [capacity, setCapacity] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log({ name, topic, capacity, location, time });
        // You can add your submission logic here
        
        // Reset form after submission
        setName('');
        setTopic('');
        setCapacity('');
        setLocation('');
        setTime('');
    };

    return (
        <div className="sticky-note-container">
            <div className="sticky-note">
                {/* Tape effect at the top */}
                <div className="tape"></div>
                
                <form className="sticky-note-content" onSubmit={handleSubmit}>                    
                    <div className="field-group">
                        <label className="field-label">Topic:</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Enter the topic"
                            className="sticky-input"
                            required
                        />
                    </div>
                    
                    <div className="field-group">
                        <label className="field-label">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="sticky-input"
                            required
                        />
                    </div>
                    
                    <div className="field-group">
                        <label className="field-label">Capacity:</label>
                        <input
                            type="text"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            placeholder="5"
                            min="1"
                            max="100"
                            className="sticky-input capacity-input"
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Room 244"
                            className="sticky-input"
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Time:</label>
                        <input
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="3:00 PM - 5:00 PM"
                            className="sticky-input"
                        />
                    </div>

                    <button type="submit" className="sticky-submit">
                        Post Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StickyNote;