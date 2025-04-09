
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialHours: number;
  onComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialHours, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const totalSeconds = initialHours * 60 * 60;
    let secondsRemaining = totalSeconds;
    
    const timer = setInterval(() => {
      secondsRemaining -= 1;
      
      if (secondsRemaining <= 0) {
        clearInterval(timer);
        if (onComplete) onComplete();
        return;
      }
      
      const hours = Math.floor(secondsRemaining / 3600);
      const minutes = Math.floor((secondsRemaining % 3600) / 60);
      const seconds = secondsRemaining % 60;
      
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [initialHours, onComplete]);
  
  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-purple-700/20">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-purple-100 mb-4">Time Remaining to Claim:</h3>
        <div className="flex justify-center items-center space-x-4">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-white bg-purple-900/50 rounded-lg w-16 h-16 flex items-center justify-center">
              {formatTime(timeLeft.hours)}
            </div>
            <span className="text-sm text-purple-200 mt-1">Hours</span>
          </div>
          <div className="text-2xl font-bold text-white">:</div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-white bg-purple-900/50 rounded-lg w-16 h-16 flex items-center justify-center">
              {formatTime(timeLeft.minutes)}
            </div>
            <span className="text-sm text-purple-200 mt-1">Minutes</span>
          </div>
          <div className="text-2xl font-bold text-white">:</div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-white bg-purple-900/50 rounded-lg w-16 h-16 flex items-center justify-center">
              {formatTime(timeLeft.seconds)}
            </div>
            <span className="text-sm text-purple-200 mt-1">Seconds</span>
          </div>
        </div>
        <p className="mt-4 text-yellow-300 text-sm font-medium animate-pulse">
          Claim before time runs out!
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
