import React, { useState, useEffect } from 'react';
import InteractiveMap from './InteractiveMap';

const StudentMaintenancePage = () => {
    const [reports, setReports] = useState([]);
    const [isReportFormVisible, setIsReportFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        objectType: '',
        location: '',
        notes: ''
    });
    const [itemStatus, setItemStatus] = useState({});
    const [areaStatus, setAreaStatus] = useState({});

    const areas = {
        'monitor-1': [...Array.from({ length: 5 }, (_, i) => `monitor-1-monitor-${i + 1}`)],
        'monitor-3': [...Array.from({ length: 5 }, (_, i) => `monitor-3-monitor-${i + 1}`)],
        'monitor-2': [...Array.from({ length: 20 }, (_, i) => `monitor-2-monitor-${i + 1}`)],
        'room-1': ['room-1-door', 'room-1-tv', 'room-1-monitor-1', 'room-1-monitor-2'],
        'room-2': ['room-2-door', 'room-2-tv', 'room-2-monitor-1', 'room-2-monitor-2'],
        'printer-1': ['printer-1-A', 'printer-1-B'],
        'printer-2': ['printer-2-A', 'printer-2-B']
    };

    // Initialize item statuses
    useEffect(() => {
        const savedItemStatus = JSON.parse(localStorage.getItem('itemStatus'));
        const savedAreaStatus = JSON.parse(localStorage.getItem('areaStatus'));

        if (savedItemStatus && savedAreaStatus) {
            setItemStatus(savedItemStatus);
            setAreaStatus(savedAreaStatus);
        } else {
            const allItems = [
                'monitor-1', 'table-1', 'table-2', 'table-3a', 'table-4', 'monitor-3',
                'bookshelf', 'room-1', 'monitor-2', 'printer-1', 'printer-2', 'room-2',
                'room-1-door', 'room-1-tv', 'room-1-monitor-1', 'room-1-monitor-2',
                'room-2-door', 'room-2-tv', 'room-2-monitor-1', 'room-2-monitor-2',
                'printer-1-A', 'printer-1-B', 'printer-2-A', 'printer-2-B',
                ...Array.from({ length: 5 }, (_, i) => `monitor-1-monitor-${i + 1}`),
                ...Array.from({ length: 5 }, (_, i) => `monitor-3-monitor-${i + 1}`),
                ...Array.from({ length: 20 }, (_, i) => `monitor-2-monitor-${i + 1}`)
            ];
            const initialStatus = allItems.reduce((acc, item) => {
                acc[item] = 'working';
                return acc;
            }, {});
            setItemStatus(initialStatus);

            const initialAreaStatus = Object.keys(areas).reduce((acc, areaId) => {
                acc[areaId] = 0;
                return acc;
            }, {});
            setAreaStatus(initialAreaStatus);
        }
    }, [areas]);

    const handleReportClick = (objectId) => {
        setFormData(prevState => ({
            ...prevState,
            objectType: objectId,
            location: 'See map' // Or more specific location data if available
        }));
        setIsReportFormVisible(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReport = { ...formData, id: Date.now() };
        setReports(prevReports => [...prevReports, newReport]);
        
        const updatedItemStatus = {
            ...itemStatus,
            [formData.objectType]: 'broken'
        };
        setItemStatus(updatedItemStatus);

        const updatedAreaStatus = { ...areaStatus };
        for (const areaId in areas) {
            const areaItems = areas[areaId];
            const brokenCount = areaItems.filter(item => updatedItemStatus[item] === 'broken').length;
            updatedAreaStatus[areaId] = brokenCount / areaItems.length;
        }
        setAreaStatus(updatedAreaStatus);

        localStorage.setItem('itemStatus', JSON.stringify(updatedItemStatus));
        localStorage.setItem('areaStatus', JSON.stringify(updatedAreaStatus));

        // Here you would typically send the report to the backend
        console.log('New report submitted:', newReport);
        setFormData({ objectType: '', location: '', notes: '' });
        setIsReportFormVisible(false);
    };

    const handleCancel = () => {
        setFormData({ objectType: '', location: '', notes: '' });
        setIsReportFormVisible(false);
    };

    return (
        <div>
            <h1>Student Maintenance Reporting</h1>
            
            <InteractiveMap onReportClick={handleReportClick} itemStatus={itemStatus} areaStatus={areaStatus} />

            {isReportFormVisible && (
                <div className="modal visible"> {/* Use the modal styles from InteractiveMap.css */}
                    <div className="modal-content">
                        <span className="close-button" onClick={handleCancel}>&times;</span>
                        <h2>Report an Issue</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="objectType">Object Type:</label>
                                <input
                                    type="text"
                                    id="objectType"
                                    name="objectType"
                                    value={formData.objectType}
                                    onChange={handleInputChange}
                                    required
                                    readOnly
                                />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <label htmlFor="location">Location:</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    readOnly
                                />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <label htmlFor="notes">Additional Notes:</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" style={{ marginTop: '10px' }}>Submit Report</button>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '20px' }}>
                <h2>Submitted Reports</h2>
                <ul>
                    {reports.map(report => (
                        <li key={report.id}>
                            <strong>{report.objectType}</strong> at {report.location}: {report.notes}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StudentMaintenancePage;