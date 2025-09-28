import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the new CSS file

const HomePage = ({ isLoggedIn, userRole }) => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);
  const homepageContainerRef = useRef(null);

  const showPopup = (message, type, buttonRef) => {
    if (!buttonRef.current || !homepageContainerRef.current) return;
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const containerRect = homepageContainerRef.current.getBoundingClientRect();

    setPopup({
      message,
      type,
      style: {
        top: buttonRect.top - containerRect.top - 40, // Position above the button, relative to container
        left: buttonRect.left - containerRect.left + buttonRect.width / 2,
        transform: 'translateX(-50%)',
      },
    });
    setTimeout(() => setPopup(null), 3000); // Hide after 3 seconds
  };

  const studentButtonRef = useRef(null);
  const employeeButtonRef = useRef(null);

  const handleStudentPortalClick = () => {
    if (!isLoggedIn) {
      showPopup('Please log in to access the student portal. Redirecting to student registration...', 'warning', studentButtonRef);
      setTimeout(() => navigate('/student-signup'), 1500); // Redirect after popup shows
    } else if (userRole === 'student') {
      navigate('/dashboard');
    } else {
      showPopup('Wrong role! You are logged in as an employee.', 'error', studentButtonRef);
    }
  };

  const handleEmployeePortalClick = () => {
    if (!isLoggedIn) {
      showPopup('Please log in to access the employee portal. Redirecting to employee registration...', 'warning', employeeButtonRef);
      setTimeout(() => navigate('/admin-signup'), 1500); // Redirect after popup shows
    } else if (userRole === 'admin' || userRole === 'staff') {
      navigate('/employee-dashboard');
    } else {
      showPopup('Wrong role! You are logged in as a student.', 'error', employeeButtonRef);
    }
  };

  return (
    <div className="homepage-container" ref={homepageContainerRef}>
      {/* 메인 컨텐츠 */}
      <div className="main-content-wrapper">
        <div className="main-content-container">
          
          {/* 헤더 섹션 */}
          <div className="header-section">
            <div className="header-icon-wrapper">
              <span className="header-icon">📚</span>
            </div>
            <h1 className="header-title">
              Welcome to the <span className="header-title-highlight">GT Library</span>
            </h1>
            <p className="header-subtitle">
              Facility Status Management System
            </p>
            <p className="header-description">
              Report facility issues or manage maintenance requests efficiently and effectively
            </p>
          </div>

          {/* 메인 선택 섹션 */}
          <div className="main-selection-grid">
            
            {/* 학생 카드 */}
            <div className="card">
              <div className="card-content-center">
                <div className="card-icon-wrapper student-card-icon-wrapper">
                  <span className="card-icon">🎓</span>
                </div>
                <h2 className="card-title">Student Portal</h2>
                <p className="card-description">
                  View facility status in real-time and report any issues you encounter. 
                  Help us maintain the library for everyone.
                </p>
                <ul className="card-list">
                  <li className="card-list-item">
                    <span className="card-list-icon">✓</span>
                    View interactive floor map
                  </li>
                  <li className="card-list-item">
                    <span className="card-list-icon">✓</span>
                    Report facility problems
                  </li>
                  <li className="card-list-item">
                    <span className="card-list-icon">✓</span>
                    Track your submissions
                  </li>
                </ul>
              </div>
              <button
                className="card-button student-card-button"
                onClick={handleStudentPortalClick}
                ref={studentButtonRef}
              >
                Enter as Student
              </button>
            </div>

            {/* 직원 카드 */}
            <div className="card">
              <div className="card-content-center">
                <div className="card-icon-wrapper employee-card-icon-wrapper">
                  <span className="card-icon">👨‍💼</span>
                </div>
                <h2 className="card-title">Employee Portal</h2>
                <p className="card-description">
                  Manage facility maintenance requests and resolve issues efficiently. 
                  Monitor the entire library status from one dashboard.
                </p>
                <ul className="card-list">
                  <li className="card-list-item">
                    <span className="card-list-icon">✓</span>
                    View all reported issues
                  </li>
                  <li className="card-list-item">
                    <span className="card-list-icon">✓</span>
                    Manage maintenance queue
                  </li>
                  <li className="card-list-item">
                    <span className="card-list-icon">✓</span>
                    Update facility status
                  </li>
                </ul>
              </div>
              <button
                className="card-button employee-card-button"
                onClick={handleEmployeePortalClick}
                ref={employeeButtonRef}
              >
                Enter as Employee
              </button>
            </div>
          </div>

          {/* 하단 정보 섹션 */}
          <div className="bottom-info-grid">
            <div className="info-card">
              <div className="info-card-icon">🕒</div>
              <h3 className="info-card-title">24/7 Monitoring</h3>
              <p className="info-card-description">Real-time facility status updates</p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">⚡</div>
              <h3 className="info-card-title">Quick Response</h3>
              <p className="info-card-description">Immediate issue reporting and resolution</p>
            </div>
            
            <div className="info-card">
              <div className="info-card-icon">📊</div>
              <h3 className="info-card-title">Analytics</h3>
              <p className="info-card-description">Track maintenance patterns and trends</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Message */}
      {popup && (
        <div
          className={`popup-message ${popup.type}`}
          style={{
            position: 'absolute',
            zIndex: 1000,
            padding: '8px 15px',
            borderRadius: '5px',
            color: 'white',
            textAlign: 'center',
            fontSize: '0.9rem',
            ...popup.style,
            backgroundColor: popup.type === 'warning' ? '#ffc107' : '#dc3545', // Yellow for warning, Red for error
          }}
        >
          {popup.message}
        </div>
      )}

      {/* 푸터 */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Georgia Tech Library. Built for GT Hackathon.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;