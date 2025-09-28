import React, { useState, useEffect, useCallback } from 'react';
import './StudentDashboard.css';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = ({ onReportClick, itemStatus, areaStatus, userType, onClearReportClick }) => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [room1Booked, setRoom1Booked] = useState(false);
    const [room2Booked, setRoom2Booked] = useState(false);
    const [room1BookingEndTime, setRoom1BookingEndTime] = useState(null);
    const [room2BookingEndTime, setRoom2BookingEndTime] = useState(null);
    const [bookingStartTime, setBookingStartTime] = useState('');
    const [bookingEndTime, setBookingEndTime] = useState('');
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [currentModalRoomId, setCurrentModalRoomId] = useState(null);
    const [reportNotes, setReportNotes] = useState(''); // State for report notes
    const [reportingItemId, setReportingItemId] = useState(null); // State for item being reported

    const getRemainingTime = (endTime) => {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            return '00:00:00';
        }

        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const hideModal = (modal) => {
        if (modal) modal.classList.remove('visible');
        setSelectedRoom(null);
        setCurrentModalRoomId(null);
        setShowBookingForm(false);
        setBookingStartTime('');
        setBookingEndTime('');
        setReportNotes(''); // Clear report notes on modal hide
        setReportingItemId(null); // Clear reporting item ID on modal hide
    };

    const handleReserveClick = () => {
        setShowBookingForm(true);
    };

    const handleBookingSubmit = (roomName) => {
        if (!bookingStartTime || !bookingEndTime) {
            alert('Please select both start and end times.');
            return;
        }

        const start = new Date();
        const [startHour, startMinute] = bookingStartTime.split(':').map(Number);
        start.setHours(startHour, startMinute, 0, 0);

        const end = new Date();
        const [endHour, endMinute] = bookingEndTime.split(':').map(Number);
        end.setHours(endHour, endMinute, 0, 0);

        if (start.getTime() >= end.getTime()) {
            alert('End time must be after start time.');
            return;
        }

        if (roomName === 'room-1') {
            setRoom1Booked(true);
            setRoom1BookingEndTime(end.getTime());
        } else if (roomName === 'room-2') {
            setRoom2Booked(true);
            setRoom2BookingEndTime(end.getTime());
        }
        setShowBookingForm(false);
        setBookingStartTime('');
        setBookingEndTime('');
    };

    const handleReportSubmit = () => {
        if (reportingItemId) {
            onReportClick(reportingItemId, reportNotes); // Pass notes to onReportClick
            hideModal(document.getElementById('report-issue-modal'));
        }
    };

    const applyStyles = useCallback(() => {
        // 1. Clear all dynamic background colors first
        document.querySelectorAll('.interactive, .diagram-box').forEach(element => {
            element.style.backgroundColor = ''; // Reset to default (transparent from CSS)
        });

        // 2. Apply area background colors
        for (const areaId in areaStatus) {
            const element = document.getElementById(areaId);
            if (element) {
                const brokenPercentage = areaStatus[areaId];
                const red = 255;
                const green = Math.round(255 * (1 - brokenPercentage));
                const blue = Math.round(255 * (1 - brokenPercentage));
                element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            }
        }

        // 3. Apply individual item background colors (overrides area color for specific items)
        for (const itemId in itemStatus) {
            const elements = document.querySelectorAll(`[data-id='${itemId}']`);
            elements.forEach(element => {
                if (itemStatus[itemId].status === 'broken') {
                    element.style.backgroundColor = '#ffcccc'; // Light red for broken items
                }
                // No 'else' here, as non-broken items should retain the area color or default
            });
        }
    }, [itemStatus, areaStatus]);

    const generateMonitors = useCallback((container, prefix, count) => {
        container.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            const monitor = document.createElement('div');
            monitor.className = 'interactive-item monitor-item';
            monitor.dataset.id = `${prefix}-monitor-${i}`;
            monitor.textContent = `${prefix.toUpperCase().replace('-MONITOR', '')} Mon ${i}`;
            container.appendChild(monitor);
        }
    }, []);

    const showModal = useCallback((modalId, title, data) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const titleElement = modal.querySelector('.modal-content h2');
        if (titleElement) {
            titleElement.textContent = title;
        }

        if (modalId === 'monitor-horizontal-modal' && data && data.areaId) {
            const horizontalBody = document.getElementById('horizontal-monitor-body');
            generateMonitors(horizontalBody, data.areaId, 5);
            applyStyles();
        } else if (modalId === 'monitor-vertical-modal' && data && data.areaId) {
            const verticalBody = document.getElementById('vertical-monitor-body');
            generateMonitors(verticalBody, data.areaId, 20);
            applyStyles();
        } else if (modalId === 'printer-modal' && data && data.printerId) {
            const printerBody = modal.querySelector('.modal-body');
            printerBody.innerHTML = '';
            
            const printerLabel = document.createElement('div');
            printerLabel.textContent = `Object printers inside ${data.printerId}:`;
            printerBody.appendChild(printerLabel);
            
            const printerA = document.createElement('div');
            printerA.className = 'interactive-item printer-item';
            printerA.dataset.id = `${data.printerId}-A`;
            printerA.textContent = 'Printer A';
            printerBody.appendChild(printerA);

            const printerB = document.createElement('div');
            printerB.className = 'interactive-item printer-item';
            printerB.dataset.id = `${data.printerId}-B`;
            printerB.textContent = 'Printer B';
            printerBody.appendChild(printerB);
        } else if (modalId === 'room-modal' && data && data.roomId) {
            setCurrentModalRoomId(data.roomId);
            if (data.roomId === 'room-1' || data.roomId === 'room-2') {
                setSelectedRoom(data.roomId);
            } else {
                setSelectedRoom(null);
            }
            setShowBookingForm(false);
            const door = modal.querySelector('#modal-door');
            const tv = modal.querySelector('#modal-tv');
            const monitor1 = modal.querySelector('#modal-monitor-1');
            const monitor2 = modal.querySelector('#modal-monitor-2');

            door.dataset.id = `${data.roomId}-door`;
            tv.dataset.id = `${data.roomId}-tv`;
            monitor1.dataset.id = `${data.roomId}-monitor-1`;
            monitor2.dataset.id = `${data.roomId}-monitor-2`;

            monitor1.textContent = `${data.roomId.replace('-', ' ')} Monitor 1`;
            monitor2.textContent = `${data.roomId.replace('-', ' ')} Monitor 2`;
            applyStyles();
        } else if (modalId === 'clear-report-modal' && data && data.objectId) {
            const clearReportBody = modal.querySelector('.modal-body');
            clearReportBody.innerHTML = `Are you sure you want to clear the report for <strong>${data.objectId}</strong>?`;
            const clearButton = document.createElement('button');
            clearButton.textContent = 'Clear';
            clearButton.onclick = () => onClearReportClick(data.objectId); // Use new handler
            clearReportBody.appendChild(clearButton);
        } else if (modalId === 'report-issue-modal' && data && data.objectId) {
            setReportingItemId(data.objectId);
        } // No view-notes-modal for student dashboard

        modal.classList.add('visible');
    }, [applyStyles, generateMonitors, onClearReportClick, setReportingItemId, setCurrentModalRoomId, setSelectedRoom, setShowBookingForm]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            if (room1Booked && room1BookingEndTime && now > room1BookingEndTime) {
                setRoom1Booked(false);
                setRoom1BookingEndTime(null);
            }
            if (room2Booked && room2BookingEndTime && now > room2BookingEndTime) {
                setRoom2Booked(false);
                setRoom2BookingEndTime(null);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [room1Booked, room1BookingEndTime, room2Booked, room2BookingEndTime]);

    useEffect(() => {
        const clickHandler = (event) => {
            const interactiveElement = event.target.closest('.interactive[data-target]');
            if (interactiveElement) {
                const targetType = interactiveElement.dataset.target;
                const objectId = interactiveElement.dataset.id || interactiveElement.id;
                
                // Students always open report modal for interactive elements
                if (targetType.endsWith('-modal')) {
                    const modalTitle = interactiveElement.dataset.title || 'Details';
                    let data = {};
                    if (objectId.startsWith('monitor')) {
                        data.areaId = objectId;
                    } else if (objectId.startsWith('printer')) {
                        data.printerId = objectId;
                    } else if (objectId.startsWith('room')) {
                        data.roomId = objectId;
                    }
                    showModal(targetType, modalTitle, data);
                } else { 
                    setReportingItemId(objectId);
                    showModal('report-issue-modal', `Report Issue for ${objectId}`, { objectId });
                }
                return;
            }
            
            if (event.target.closest('#modal-room-layout')) {
                const roomItem = event.target.closest('.interactive');
                if (roomItem) {
                    const objectId = roomItem.dataset.id || roomItem.id;
                    // Students always open report modal for room items
                    setReportingItemId(objectId);
                    showModal('report-issue-modal', `Report Issue for ${objectId}`, { objectId });
                }
                return;
            }
            
            if (event.target.matches('.interactive-item')) {
                const itemId = event.target.dataset.id;
                // Students always open report modal for interactive items
                setReportingItemId(itemId);
                showModal('report-issue-modal', `Report Issue for ${itemId}`, { objectId: itemId });
                return;
            }
            
            if (event.target.matches('.close-button')) {
                hideModal(event.target.closest('.modal'));
            }
            if (event.target.matches('.modal')) {
                hideModal(event.target);
            }
            if (event.target.id === 'reserve-room-button') {
                handleReserveClick();
            }
            if (event.target.id === 'confirm-booking-button') {
                handleBookingSubmit(selectedRoom);
            }
        };

        document.body.addEventListener('click', clickHandler);
        applyStyles();

        return () => {
            document.body.removeEventListener('click', clickHandler);
        };
    }, [onReportClick, applyStyles, itemStatus, userType, onClearReportClick, selectedRoom, room1Booked, room1BookingEndTime, room2Booked, room2BookingEndTime, bookingStartTime, bookingEndTime, showBookingForm, hideModal, handleReserveClick, handleBookingSubmit, setReportingItemId, showModal]);

    return (
        <div className="homepage-container">
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-flex">
                        <div className="navbar-logo-group">
                            <div className="navbar-logo-icon-wrapper">
                                <span className="navbar-logo-icon">📚</span>
                            </div>
                            <span className="navbar-title">GT Library</span>
                        </div>
                        <div className="navbar-links">
                            <Link to="/" className="navbar-link">Home</Link>
                            <Link to="/dashboard" className="navbar-link">Student Dashboard</Link>
                            <a href="#" className="navbar-link">About</a>
                            <a href="#" className="navbar-link">Contact</a>
                            <a href="#" className="navbar-link">Help</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="main-content-wrapper">
                <div className="main-content-container">
                    <div className="dashboard-header">
                        <h1>Student Dashboard</h1>
                    </div>
                    <div className="dashboard-layout">
                        <div className="map-section-container">
                            <h3>Interactive Map</h3>
                            <div class="map-scale-wrapper">
                                <div id="diagram-container">
                                    <div id="monitor-1-box" class="diagram-box interactive" data-target="monitor-horizontal-modal" data-title="Monitor Area 1" data-id="monitor-1">
                                        <svg class="icon" viewBox="0 0 24 24"><path d="M21 7H3a1 1 0 00-1 1v8a1 1 0 001 1h6v2H7a1 1 0 00-1 1v1h12v-1a1 1 0 00-1-1h-2v-2h6a1 1 0 001-1V8a1 1 0 00-1-1zm-1 8H4V9h16v6z"></path></svg>
                                        Monitor 1
                                    </div>
                                    <div id="top-wall" class="wall"></div>
                                    <div id="tables-container">
                                        <div class="diagram-box interactive" data-target="backend" data-id="table-1">Table 1</div>
                                        <div class="diagram-box interactive" data-target="backend" data-id="table-2">Table 2</div>
                                        <div class="diagram-box interactive" data-target="backend" data-id="table-3a">Table 3</div>
                                        <div class="diagram-box interactive" data-target="backend" data-id="table-4">Table 4</div>
                                    </div>
                                    <div id="bottom-wall" class="wall"></div>
                                    <div id="monitor-3-box" class="diagram-box interactive" data-target="monitor-horizontal-modal" data-title="Monitor Area 3" data-id="monitor-3">
                                        <svg class="icon" viewBox="0 0 24 24"><path d="M21 7H3a1 1 0 00-1 1v8a1 1 0 001 1h6v2H7a1 1 0 00-1 1v1h12v-1a1 1 0 00-1-1h-2v-2h6a1 1 0 001-1V8a1 1 0 00-1-1zm-1 8H4V9h16v6z"></path></svg>
                                        Monitor 3
                                    </div>
                                    <div id="vertical-wall" class="wall"></div>
                                    <div id="bookshelf-box" class="diagram-box interactive" data-target="backend" data-id="bookshelf">Book Shelf</div>
                                    <div id="room-1-box" class="diagram-box interactive" data-target="room-modal" data-id="room-1">
                                        <svg class="icon" viewBox="0 0 24 24"><path d="M21.707 10.293l-3-3A.996.996 0 0018 7H6a.996.996 0 00-.707.293l-3 3A.996.996 0 002 11v6a1 1 0 001 1h18a1 1 0 001-1v-6a.996.996 0 00-.293-.707zM12 4a2 2 0 100-4 2 2 0 000 4zm-7.293 7H19.293L17.5 9h-11l-1.793 2zM20 16H4v-3h16v3z"></path></svg>
                                        Room 1
                                        {room1Booked && <div className="booking-indicator booked"></div>}
                                    </div>
                                    <div id="monitor-2-container" class="diagram-box interactive" data-target="monitor-vertical-modal" data-title="Monitor Area 2" data-id="monitor-2">
                                        <div id="printer-1-box" class="diagram-box interactive" data-target="printer-modal" data-id="printer-1">Printer 1</div>
                                        <div class="monitor-2-label">Monitor 2</div>
                                        <div id="printer-2-box" class="diagram-box interactive" data-target="printer-modal" data-id="printer-2">Printer 2</div>
                                    </div>
                                    <div id="room-2-box" class="diagram-box interactive" data-target="room-modal" data-id="room-2">
                                        <svg class="icon" viewBox="0 0 24 24"><path d="M21.707 10.293l-3-3A.996.996 0 0018 7H6a.996.996 0 00-.707.293l-3 3A.996.996 0 002 11v6a1 1 0 001 1h18a1 1 0 001-1v-6a.996.996 0 00-.293-.707zM12 4a2 2 0 100-4 2 2 0 000 4zm-7.293 7H19.293L17.5 9h-11l-1.793 2zM20 16H4v-3h16v3z"></path></svg>
                                        Room 2
                                        {room2Booked && <div className="booking-indicator booked"></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="blank-container">
                            <h2>Social/Study Bulletin</h2>
                            <p> </p>
                            <img src="/sample-board.png" alt="Sample Bulletin Board" className="sample-bulletin-image" />
                            <button className="bulletin-redirect-btn" onClick={() => navigate('/bulletin')}>Go to Bulletin</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Georgia Tech Library. Built for GT Hackathon.</p>
                </div>
            </footer>

            <div id="room-modal" className="modal">
                <div className="modal-content">
                    <span className="close-button" onClick={() => hideModal(document.getElementById('room-modal'))}>&times;</span>
                    <h2>{currentModalRoomId ? currentModalRoomId.replace('-', ' ') : 'Room Details'}</h2>
                    {selectedRoom && (selectedRoom === 'room-1' || selectedRoom === 'room-2') && (
                        <div className="room-booking-header">
                            {(selectedRoom === 'room-1' && room1Booked) || (selectedRoom === 'room-2' && room2Booked) ? (
                                <p>Booked, time remaining: {(selectedRoom === 'room-1' ? getRemainingTime(room1BookingEndTime) : getRemainingTime(room2BookingEndTime))}</p>
                            ) : (
                                <button id="reserve-room-button">Reserve Room</button>
                            )}
                        </div>
                    )}
                    {!showBookingForm ? (
                        <div className="modal-body">
                            <div id="modal-room-layout">
                                <div id="modal-door" className="room-item interactive" data-id="door"></div>
                                <div id="modal-tv" className="room-item interactive" data-id="tv">TV</div>
                                <div id="modal-monitor-row">
                                    <div id="modal-monitor-1" className="room-item interactive modal-monitor"></div>
                                    <div id="modal-monitor-2" className="room-item interactive modal-monitor"></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="booking-form">
                            <h3>Book {selectedRoom === 'room-1' ? 'Room 1' : 'Room 2'}</h3>
                            <div>
                                <label>Start Time:</label>
                                <input type="time" value={bookingStartTime} onChange={(e) => setBookingStartTime(e.target.value)} />
                            </div>
                            <div>
                                <label>End Time:</label>
                                <input type="time" value={bookingEndTime} onChange={(e) => setBookingEndTime(e.target.value)} />
                            </div>
                            <button id="confirm-booking-button">Confirm Booking</button>
                            <button onClick={() => setShowBookingForm(false)}>Cancel</button>
                        </div>
                    )}
                </div>
            </div>
            <div id="printer-modal" className="modal"> <div className="modal-content"> <span className="close-button">&times;</span> <h2>Printer Area</h2> <div className="modal-body"></div> </div> </div>
            <div id="monitor-horizontal-modal" className="modal"> <div className="modal-content"> <span className="close-button">&times;</span> <h2>Monitor Area</h2> <div className="modal-body" id="horizontal-monitor-body"></div> </div> </div>
            <div id="monitor-vertical-modal" className="modal"> <div className="modal-content"> <span className="close-button">&times;</span> <h2>Monitor Area</h2> <div className="modal-body" id="vertical-monitor-body"></div> </div> </div>
            <div id="clear-report-modal" className="modal">
                <div className="modal-content">
                    <span className="close-button" onClick={() => hideModal(document.getElementById('clear-report-modal'))}>&times;</span>
                    <h2>Clear Report</h2>
                    <div className="modal-body">
                        Are you sure you want to clear the report for <strong>{reportingItemId}</strong>?
                        <button onClick={() => onClearReportClick(reportingItemId)}>Clear</button>
                    </div>
                </div>
            </div>
            {/* New Report Issue Modal */}
            <div id="report-issue-modal" className="modal">
                <div className="modal-content">
                    <span className="close-button" onClick={() => hideModal(document.getElementById('report-issue-modal'))}>&times;</span>
                    <h2>Report Issue for {reportingItemId}</h2>
                    <div className="modal-body">
                        <textarea
                            placeholder="Add additional notes here..."
                            value={reportNotes}
                            onChange={(e) => setReportNotes(e.target.value)}
                            rows="5"
                        ></textarea>
                        <button onClick={handleReportSubmit}>Submit Report</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;