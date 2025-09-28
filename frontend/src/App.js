import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentDashboard from './components/StudentDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import Bulletin from './components/Bulletin';
import AdminSignup from "./components/AdminSignup"; // Corrected import
import StudentSignup from "./components/StudentSignup";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";

// Define a mapping of areas to their contained devices
const allDevices = {
  'monitor-1-box': ['monitor-1'],
  'monitor-3-box': ['monitor-3'],
  'tables-container': ['table-1', 'table-2', 'table-3a', 'table-4'],
  'bookshelf-box': ['bookshelf'],
  'room-1-box': ['room-1-door', 'room-1-tv', 'room-1-monitor-1', 'room-1-monitor-2'],
  'monitor-2-container': ['printer-1', 'printer-2'], // Dynamic monitors will be handled in component
  'room-2-box': ['room-2-door', 'room-2-tv', 'room-2-monitor-1', 'room-2-monitor-2'],
};

function App() {
  const [itemStatus, setItemStatus] = useState({}); // Stores { itemId: { status: 'broken', notes: '...' } }
  const [areaStatus, setAreaStatus] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Effect to calculate areaStatus whenever itemStatus changes
  useEffect(() => {
    const newAreaStatus = {};

    for (const areaId in allDevices) {
      let totalDevicesInArea = 0;
      let brokenDevicesInArea = 0;

      // Handle static devices
      allDevices[areaId].forEach(deviceId => {
        totalDevicesInArea++;
        if (itemStatus[deviceId] && itemStatus[deviceId].status === 'broken') {
          brokenDevicesInArea++;
        }
      });

      // Handle dynamically generated monitors for monitor-2-container
      if (areaId === 'monitor-2-container') {
        // Assuming 20 monitors are generated for monitor-2-container (from EmployeeDashboard.js)
        for (let i = 1; i <= 20; i++) {
          const monitorId = `monitor-2-monitor-${i}`;
          totalDevicesInArea++;
          if (itemStatus[monitorId] && itemStatus[monitorId].status === 'broken') {
            brokenDevicesInArea++;
          }
        }
      }

      // Handle dynamically generated monitors for room-1 and room-2
      if (areaId === 'room-1-box') {
        // Assuming 2 monitors are generated for room-1 (from EmployeeDashboard.js)
        for (let i = 1; i <= 2; i++) {
          const monitorId = `room-1-monitor-${i}`;
          totalDevicesInArea++;
          if (itemStatus[monitorId] && itemStatus[monitorId].status === 'broken') {
            brokenDevicesInArea++;
          }
        }
      }
      if (areaId === 'room-2-box') {
        // Assuming 2 monitors are generated for room-2 (from EmployeeDashboard.js)
        for (let i = 1; i <= 2; i++) {
          const monitorId = `room-2-monitor-${i}`;
          totalDevicesInArea++;
          if (itemStatus[monitorId] && itemStatus[monitorId].status === 'broken') {
            brokenDevicesInArea++;
          }
        }
      }

      if (totalDevicesInArea > 0) {
        newAreaStatus[areaId] = brokenDevicesInArea / totalDevicesInArea;
      } else {
        newAreaStatus[areaId] = 0; // No devices, so 0% broken
      }
    }
    setAreaStatus(newAreaStatus);
  }, [itemStatus]);

  // Authentication state management
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    // navigate('/'); // Redirect to home after logout - handled by Navbar now
  };

  const handleReportClick = (itemId, notes) => {
    console.log(`Reporting item: ${itemId} with notes: ${notes}`);
    setItemStatus(prevStatus => ({ ...prevStatus, [itemId]: { status: 'broken', notes: notes } }));
  };

  const handleClearReportClick = (itemId) => {
    console.log(`Clearing report for item: ${itemId}`);
    setItemStatus(prevStatus => {
      const newStatus = { ...prevStatus };
      delete newStatus[itemId];
      return newStatus;
    });
  };

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
      <div className="container mx-auto px-4">
        <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} userRole={userRole} />} />
        <Route 
          path="/dashboard" 
          element={
            <StudentDashboard 
              onReportClick={handleReportClick}
              itemStatus={itemStatus}
              areaStatus={areaStatus}
              userType={'student'}
              onClearReportClick={handleClearReportClick}
            />
          }
        />
        <Route 
          path="/employee-dashboard" 
          element={
            <EmployeeDashboard 
              onReportClick={handleReportClick}
              itemStatus={itemStatus}
              areaStatus={areaStatus}
              userType={'employee'}
              onClearReportClick={handleClearReportClick}
            />
          }
        />
        <Route path="/bulletin/" element={<Bulletin />}/>
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLogin} />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
