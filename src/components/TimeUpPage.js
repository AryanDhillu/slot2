import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    navigate('/secret');
  };

  const handlePopupOpen = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <div className="popup">
      <button 
        onClick={handlePopupOpen} 
        className="leaderboard-button"
        style={{ marginTop: '10px' }}
      >
        <FaTrophy /> Show Leaderboard
      </button>
      <h1 style={{color:"red "}}>Aalasyam Ayyindhi Acharya Puthra!!</h1>
      <div className="row1">
        <img src={bujji} alt="img" className='size'/>
        <div style={{marginRight:"7vw"}}>
          <h1>Bhairava !!!</h1>
          <h1 style={{color:"white"}}>Bounty collected: {userScore} units</h1> {/* Display the user's score */}
        </div>
      </div>
      
      <button 
        onClick={handleRedirectToSecret} 
        className="px-3 py-2 text-sm bg-blue text-white border border-white-300 rounded-md hover:bg-gray-800 transition duration-300 mt-2 animate__animated animate__fadeInUpBig"
      >
        Back to Secret Code Page
      </button>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="leader">
            <button onClick={handlePopupClose} className="popup-close-button">Close</button>
            <Leaderboard />
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeUpPage;
    