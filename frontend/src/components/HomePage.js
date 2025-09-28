import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the new CSS file

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* 네비게이션 바 */}
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
              <a href="#" className="navbar-link">About</a>
              <a href="#" className="navbar-link">Contact</a>
              <a href="#" className="navbar-link">Help</a>
            </div>
          </div>
        </div>
      </nav>

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
              <Link to="/dashboard" className="card-button-link">
                <button
                  className="card-button student-card-button"
                >
                  Enter as Student
                </button>
              </Link>
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
              <Link to="/employee-dashboard" className="card-button-link">
                <button
                  className="card-button employee-card-button"
                >
                  Enter as Employee
                </button>
              </Link>
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

      {/* 푸터 */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Georgia Tech Library. Built for GT Hackathon.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;