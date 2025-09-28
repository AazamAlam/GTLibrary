
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentMaintenancePage from './components/StudentMaintenancePage';
import Bulletin from './components/Bulletin';
import SignupAdmin from "./components/SignupAdmin";

function App() {
  const handleLoginSuccess = () => {
    // Handle successful login - navigate to admin dashboard or desired page
    console.log('Admin login successful');
    // You can add navigation logic here, like:
    // window.location.href = '/admin-dashboard';
    // or if you have an admin dashboard route, you could navigate there
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map/:userType" element={<StudentMaintenancePage />} />
          <Route path="/bulletin" element={<Bulletin />} />
          <Route path="/SignupAdmin" element={<SignupAdmin onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;