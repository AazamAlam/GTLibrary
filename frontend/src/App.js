import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentMaintenancePage from './components/StudentMaintenancePage';
import Bulletin from './components/Bulletin';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map/:userType" element={<StudentMaintenancePage />} />
          <Route path="/bulletin" element={<Bulletin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
