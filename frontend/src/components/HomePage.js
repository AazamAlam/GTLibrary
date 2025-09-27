import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600">
      {/* 네비게이션 바 */}
      <nav className="bg-white bg-opacity-10 backdrop-blur-sm border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-xl">📚</span>
              </div>
              <span className="text-white font-bold text-xl">GT Library</span>
            </div>
            <div className="flex items-center space-x-6 text-white">
              <a href="#" className="hover:text-yellow-200 transition-colors">About</a>
              <a href="#" className="hover:text-yellow-200 transition-colors">Contact</a>
              <a href="#" className="hover:text-yellow-200 transition-colors">Help</a>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          
          {/* 헤더 섹션 */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <span className="text-4xl">📚</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome to the <span className="text-yellow-200">GT Library</span>
            </h1>
            <p className="text-xl text-yellow-100 mb-2">
              Facility Status Management System
            </p>
            <p className="text-lg text-yellow-200 max-w-2xl mx-auto">
              Report facility issues or manage maintenance requests efficiently and effectively
            </p>
          </div>

          {/* 메인 선택 섹션 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* 학생 카드 */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 flex flex-col">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🎓</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Student Portal</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  View facility status in real-time and report any issues you encounter. 
                  Help us maintain the library for everyone.
                </p>
                <ul className="text-left text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    View interactive floor map
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Report facility problems
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Track your submissions
                  </li>
                </ul>
              </div>
              <Link to="/map/student" className="w-full mt-auto">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Enter as Student
                </button>
              </Link>
            </div>

            {/* 직원 카드 */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 flex flex-col">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">👨‍💼</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Employee Portal</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Manage facility maintenance requests and resolve issues efficiently. 
                  Monitor the entire library status from one dashboard.
                </p>
                <ul className="text-left text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    View all reported issues
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Manage maintenance queue
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Update facility status
                  </li>
                </ul>
              </div>
              <Link to="/map/employee" className="w-full mt-auto">
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Enter as Employee
                </button>
              </Link>
            </div>
          </div>

          {/* 하단 정보 섹션 */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🕒</div>
              <h3 className="text-white font-semibold mb-2">24/7 Monitoring</h3>
              <p className="text-yellow-100 text-sm">Real-time facility status updates</p>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-white font-semibold mb-2">Quick Response</h3>
              <p className="text-yellow-100 text-sm">Immediate issue reporting and resolution</p>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-white font-semibold mb-2">Analytics</h3>
              <p className="text-yellow-100 text-sm">Track maintenance patterns and trends</p>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-black bg-opacity-20 backdrop-blur-sm border-t border-white border-opacity-20 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <p>&copy; 2024 Georgia Tech Library. Built for GT Hackathon.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
