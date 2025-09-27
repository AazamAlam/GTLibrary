import React, { useEffect, useCallback } from 'react';
import './InteractiveMap.css';

const InteractiveMap = ({ onReportClick, itemStatus, areaStatus }) => {
    const applyStyles = useCallback(() => {
        // Update styles based on itemStatus
        for (const itemId in itemStatus) {
            const elements = document.querySelectorAll(`[data-id='${itemId}']`);
            elements.forEach(element => {
                if (itemStatus[itemId] === 'broken') {
                    element.style.backgroundColor = '#ffcccc'; // Light red
                } else {
                    element.style.backgroundColor = ''; // Reset to default
                }
            });
        }

        // Update area styles based on areaStatus
        for (const areaId in areaStatus) {
            const element = document.getElementById(`${areaId}-box`) || document.getElementById(`${areaId}-container`);
            if (element) {
                const brokenPercentage = areaStatus[areaId];
                const red = 255;
                const green = 255 * (1 - brokenPercentage);
                const blue = 255 * (1 - brokenPercentage);
                element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            }
        }
    }, [itemStatus, areaStatus]);

    useEffect(() => {
        const sendToBackend = (itemId) => {
            onReportClick(itemId);
        };

        const generateMonitors = (container, prefix, count) => {
            container.innerHTML = ''; // Clear existing monitors
            for (let i = 1; i <= count; i++) {
                const monitor = document.createElement('div');
                monitor.className = 'interactive-item monitor-item';
                monitor.dataset.id = `${prefix}-monitor-${i}`;
                monitor.textContent = `${prefix.toUpperCase().replace('-MONITOR', '')} Mon ${i}`;
                container.appendChild(monitor);
            }
        };

        const showModal = (modalId, title, data) => {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            const titleElement = modal.querySelector('.modal-content h2');
            if (titleElement) {
                titleElement.textContent = title;
            }

            if (modalId === 'monitor-horizontal-modal' && data && data.areaId) {
                const horizontalBody = document.getElementById('horizontal-monitor-body');
                generateMonitors(horizontalBody, data.areaId, 5);
                applyStyles(); // Apply styles after generating monitors
            } else if (modalId === 'monitor-vertical-modal' && data && data.areaId) {
                const verticalBody = document.getElementById('vertical-monitor-body');
                generateMonitors(verticalBody, data.areaId, 20);
                applyStyles(); // Apply styles after generating monitors
            } else if (modalId === 'printer-modal' && data && data.printerId) {
                const printerBody = modal.querySelector('.modal-body');
                printerBody.innerHTML = ''; // Clear existing
                
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
                applyStyles(); // Apply styles after setting data-id for room items
            }

            modal.classList.add('visible');
        };

        const hideModal = (modal) => {
            if (modal) modal.classList.remove('visible');
        };

        const clickHandler = (event) => {
            const interactiveElement = event.target.closest('.interactive[data-target]');
            if (interactiveElement) {
                const targetType = interactiveElement.dataset.target;
                const objectId = interactiveElement.dataset.id || interactiveElement.id;
                
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
                } else if (targetType === 'backend') {
                    sendToBackend(objectId);
                }
                return;
            }
            
            if (event.target.closest('#modal-room-layout')) {
                const roomItem = event.target.closest('.interactive');
                if (roomItem) {
                    sendToBackend(roomItem.dataset.id || roomItem.id);
                }
                return;
            }
            
            if (event.target.matches('.interactive-item')) {
                const itemId = event.target.dataset.id;
                sendToBackend(itemId);
                return;
            }
            
            if (event.target.matches('.close-button')) {
                hideModal(event.target.closest('.modal'));
            }
            if (event.target.matches('.modal')) {
                hideModal(event.target);
            }
        };

        document.body.addEventListener('click', clickHandler);
        applyStyles(); // Apply styles on initial render and when itemStatus/areaStatus change

        return () => {
            document.body.removeEventListener('click', clickHandler);
        };
    }, [onReportClick, applyStyles]);

    return (
        <div>
            <div id="diagram-container">
                <div id="monitor-1-box" className="diagram-box interactive" data-target="monitor-horizontal-modal" data-title="Monitor Area 1" data-id="monitor-1">
                    <svg className="icon" viewBox="0 0 24 24"><path d="M21 7H3a1 1 0 00-1 1v8a1 1 0 001 1h6v2H7a1 1 0 00-1 1v1h12v-1a1 1 0 00-1-1h-2v-2h6a1 1 0 001-1V8a1 1 0 00-1-1zm-1 8H4V9h16v6z"></path></svg>
                    Monitor 1
                </div>
                <div id="top-wall" className="wall"></div>
                <div id="tables-container">
                    <div className="diagram-box interactive" data-target="backend" data-id="table-1">Table 1</div>
                    <div className="diagram-box interactive" data-target="backend" data-id="table-2">Table 2</div>
                    <div className="diagram-box interactive" data-target="backend" data-id="table-3a">Table 3</div>
                    <div className="diagram-box interactive" data-target="backend" data-id="table-4">Table 4</div>
                </div>
                <div id="bottom-wall" className="wall"></div>
                <div id="monitor-3-box" className="diagram-box interactive" data-target="monitor-horizontal-modal" data-title="Monitor Area 3" data-id="monitor-3">
                    <svg className="icon" viewBox="0 0 24 24"><path d="M21 7H3a1 1 0 00-1 1v8a1 1 0 001 1h6v2H7a1 1 0 00-1 1v1h12v-1a1 1 0 00-1-1h-2v-2h6a1 1 0 001-1V8a1 1 0 00-1-1zm-1 8H4V9h16v6z"></path></svg>
                    Monitor 3
                </div>
                <div id="vertical-wall" className="wall"></div>
                <div id="bookshelf-box" className="diagram-box interactive" data-target="backend" data-id="bookshelf">Book Shelf</div>
                <div id="room-1-box" className="diagram-box interactive" data-target="room-modal" data-id="room-1">
                     <svg className="icon" viewBox="0 0 24 24"><path d="M21.707 10.293l-3-3A.996.996 0 0018 7H6a.996.996 0 00-.707.293l-3 3A.996.996 0 002 11v6a1 1 0 001 1h18a1 1 0 001-1v-6a.996.996 0 00-.293-.707zM12 4a2 2 0 100-4 2 2 0 000 4zm-7.293 7H19.293L17.5 9h-11l-1.793 2zM20 16H4v-3h16v3z"></path></svg>
                    Room 1
                </div>
                <div id="monitor-2-container" className="diagram-box interactive" data-target="monitor-vertical-modal" data-title="Monitor Area 2" data-id="monitor-2">
                    <div id="printer-1-box" className="diagram-box interactive" data-target="printer-modal" data-id="printer-1">Printer 1</div>
                    <div className="monitor-2-label">Monitor 2</div>
                    <div id="printer-2-box" className="diagram-box interactive" data-target="printer-modal" data-id="printer-2">Printer 2</div>
                </div>
                <div id="room-2-box" className="diagram-box interactive" data-target="room-modal" data-id="room-2">
                    <svg className="icon" viewBox="0 0 24 24"><path d="M21.707 10.293l-3-3A.996.996 0 0018 7H6a.996.996 0 00-.707.293l-3 3A.996.996 0 002 11v6a1 1 0 001 1h18a1 1 0 001-1v-6a.996.996 0 00-.293-.707zM12 4a2 2 0 100-4 2 2 0 000 4zm-7.293 7H19.293L17.5 9h-11l-1.793 2zM20 16H4v-3h16v3z"></path></svg>
                    Room 2
                </div>
            </div>

            <div id="room-modal" className="modal">
                <div className="modal-content">
                    <span className="close-button">&times;</span>
                    <h2>Room Layout</h2>
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
                </div>
            </div>
            <div id="printer-modal" className="modal"> <div className="modal-content"> <span className="close-button">&times;</span> <h2>Printer Area</h2> <div className="modal-body"></div> </div> </div>
            <div id="monitor-horizontal-modal" className="modal"> <div className="modal-content"> <span className="close-button">&times;</span> <h2>Monitor Area</h2> <div className="modal-body" id="horizontal-monitor-body"></div> </div> </div>
            <div id="monitor-vertical-modal" className="modal"> <div className="modal-content"> <span className="close-button">&times;</span> <h2>Monitor Area</h2> <div className="modal-body" id="vertical-monitor-body"></div> </div> </div>
        </div>
    );
};

export default InteractiveMap;