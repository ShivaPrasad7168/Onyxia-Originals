import React, { useEffect, useState } from 'react';
import './LogoAnimation.css';
import birdSvg from './bird.svg'; // Make sure to add your bird SVG file here
import onyxiaLogo from '../assets/onyxia-logo.png'; // Adjust path if needed

const LogoAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState('bird'); // bird -> morph -> logo -> disappear

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('morph'), 3000); // flap wings for 3s
    const timer2 = setTimeout(() => setStage('logo'), 4500); // morph duration 1.5s
    const timer3 = setTimeout(() => {
      setStage('disappear');
      onComplete && onComplete();
    }, 6000); // stay as logo for 1.5s, then disappear

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className={`logo-animation-overlay ${stage}`}>
      {(stage === 'bird' || stage === 'morph') && (
        <img className="bird" src={birdSvg} alt="Bird flying" />
      )}
      {(stage === 'morph' || stage === 'logo' || stage === 'disappear') && (
        <img className={`onyxia-logo ${stage}`} src={onyxiaLogo} alt="ONYXIA logo" />
      )}
    </div>
  );
};

export default LogoAnimation;
