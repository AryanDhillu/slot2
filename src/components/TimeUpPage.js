import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Level1Img from './images/satarc.png';
import './styles/index.css';
import bujji from './images/bujji.png';
import Leaderboard from './Leaderboard'; // Import the Leaderboard component
import { FaTrophy } from 'react-icons/fa';

function TimeUpPage() {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    // Reset the secret code in localStorage
    localStorage.setItem('secretCode', 'false');

    // Retrieve the user's score from localStorage
    const savedScore = localStorage.getItem('score');
    if (savedScore !== null) {
      setUserScore(parseInt(savedScore, 10));
    }
  }, []);

  const handleRedirectToSecret = () => {
    navigate('/');
  };

  const handlePopupOpen = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <div className="popup">
      {/* <button 
        onClick={handlePopupOpen} 
        className="leaderboard-button"
        style={{ marginTop: '10px' }}
      >
        <FaTrophy /> Show Leaderboard
      </button> */}
      <img src={Level1Img} style={{height:"250px", width:"10vw"}} alt="SATARC"/>
      <h1 style={{color:"red "}}>Game Up</h1>
      <h1>Get in the Game Tommorow. Register Now!</h1>
    </div>
  );
}
export default TimeUpPage;
    