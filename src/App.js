import React, { useState, useEffect } from 'react';
import { FaClock, FaTrophy } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import RulesPage from './components/Rulespage';
import LoginPage from './components/loginpage';
import Levelone from './components/Levelone';
import Leveltwo from './components/Leveltwo';
import Levelthree from './components/Levelthree';
import Levelfour from './components/Levelfour';
import Levelfive from './components/Levelfive';
import Leaderboard from './components/Leaderboard';
import SecretCodePage from './components/SecretCodePage';
import TimeUpPage from './components/TimeUpPage';
import NotFoundPage from './components/NotFoundPage';

import './components/styles/App.css';

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTimeLeft = localStorage.getItem('timeLeft');
    return savedTimeLeft !== null ? parseInt(savedTimeLeft, 10) : 420; // Default to 7 minutes
  });

  const [timerRunning, setTimerRunning] = useState(() => {
    const savedTimerRunning = localStorage.getItem('timerRunning');
    return savedTimerRunning !== null ? JSON.parse(savedTimerRunning) : false;
  });

  const [timerEnded, setTimerEnded] = useState(false);
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [rollnum, setRollnum] = useState(() => localStorage.getItem('rollnum') || '');
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore !== null ? parseInt(savedScore, 10) : 0;
  });

  const [isPopupVisible, setPopupVisible] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          localStorage.setItem('timeLeft', newTimeLeft);
          return newTimeLeft;
        });
      }, 1000);
    } else if (timeLeft <= 0) {
      setTimerEnded(true);
      setTimerRunning(false);
      clearLocalStorage();
      if (timer) clearInterval(timer);
      navigate('/timeup');
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft, navigate]);

  const startTimer = () => {
    setTimerRunning(true);
    localStorage.setItem('timerRunning', true);
  };

  const setUserInfo = (userName, userRollnum) => {
    setUsername(userName);
    setRollnum(userRollnum);
    localStorage.setItem('username', userName);
    localStorage.setItem('rollnum', userRollnum);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('timeLeft');
    localStorage.removeItem('timerRunning');
    localStorage.removeItem('score'); // Clear score as well
  };

  useEffect(() => {
    localStorage.setItem('score', score);
  }, [score]);

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handlePopupOpen = () => {
    setPopupVisible(true);
  };

  if (timerEnded) {
    return <TimeUpPage clearLocalStorage={clearLocalStorage} />;
  }

  const isAuthenticated = localStorage.getItem('secretCode') === 'true';

  return (
    <div>
      {location.pathname !== '/timeup' && (location.pathname !== '/' && location.pathname !== '/rules' && location.pathname !== '/secret') && (
        <div className='space'>
          <div className='timer1'>
            <div className='row'>
              <FaClock className="clock-icon" />
              <p>Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
            </div>
          </div>
          <button onClick={handlePopupOpen} className="leaderboard-button">
            <FaTrophy /> Show Leaderboard
          </button>
        </div>
      )}

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="leader">
            <button onClick={handlePopupClose} className="popup-close-button">Close</button>
            <Leaderboard username={username} rollnum={rollnum} score={score} />
          </div>
        </div>
      )}

      <Routes>
        <Route path="/secret" element={<SecretCodePage />} />
        <Route path="/login" element={<LoginPage startTimer={startTimer} setUserInfo={setUserInfo} />} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/secret" />} />
        <Route path="/rules" element={isAuthenticated ? <RulesPage /> : <Navigate to="/secret" />} />
        <Route path="/level1" element={isAuthenticated ? <Levelone username={username} rollnum={rollnum} timeLeft={timeLeft} score={score} setScore={setScore} /> : <Navigate to="/secret" />} />
        <Route path="/level2" element={isAuthenticated ? <Leveltwo username={username} rollnum={rollnum} timeLeft={timeLeft} score={score} setScore={setScore} /> : <Navigate to="/secret" />} />
        <Route path="/level3" element={isAuthenticated ? <Levelthree username={username} rollnum={rollnum} timeLeft={timeLeft} score={score} setScore={setScore} /> : <Navigate to="/secret" />} />
        <Route path="/level4" element={isAuthenticated ? <Levelfour username={username} rollnum={rollnum} timeLeft={timeLeft} score={score} setScore={setScore} /> : <Navigate to="/secret" />} />
        <Route path="/level5" element={isAuthenticated ? <Levelfive username={username} rollnum={rollnum} timeLeft={timeLeft} score={score} setScore={setScore} /> : <Navigate to="/secret" />} />
        <Route path="/leaderboard" element={isAuthenticated ? <Leaderboard username={username} rollnum={rollnum} score={score} /> : <Navigate to="/secret" />} />
        <Route path="/timeup" element={<TimeUpPage clearLocalStorage={clearLocalStorage} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
