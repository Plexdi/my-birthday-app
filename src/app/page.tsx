'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import react-confetti (install with: npm install react-confetti)
const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false });

function HeartGame() {
  const [score, setScore] = useState(0);
  const [heartPosition, setHeartPosition] = useState({ top: 50, left: 50 });
  const [gameOver, setGameOver] = useState(false);

  // Moves the heart to a random position (using percent values)
  const moveHeart = () => {
    const newTop = Math.random() * 80; // 0% to 80%
    const newLeft = Math.random() * 80;
    setHeartPosition({ top: newTop, left: newLeft });
  };

  // On heart click, update the score and check if the game is over
  const handleHeartClick = () => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore >= 10) {
      setGameOver(true);
    } else {
      moveHeart();
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Catch the Heart!</h2>
      <p className="text-center mb-4">Score: {score}</p>
      <div className="relative h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
        {!gameOver && (
          <div
            onClick={handleHeartClick}
            style={{ top: `${heartPosition.top}%`, left: `${heartPosition.left}%` }}
            className="absolute text-4xl cursor-pointer select-none"
          >
            ❤️
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-200 bg-opacity-75">
            <p className="text-xl font-bold text-green-800">
              You caught the heart! Happy Birthday!
            </p>
          </div>
        )}
      </div>
      {gameOver && (
        <p className="mt-4 text-center text-gray-700">
          Here's a secret message: You're the love of my life, and I'm so excited for all our adventures together!
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  const handleCelebrateClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 to-purple-300 p-4">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <div className="z-10 text-center p-4 bg-white bg-opacity-75 rounded-lg shadow-xl">
        <h1 className="text-5xl font-extrabold text-pink-700 mb-4">
          Happy Birthday, Miana!
        </h1>
        <p className="text-xl text-gray-800 mb-8">
          I hope your day is filled with joy, surprises, and lots of love.
        </p>
        <button
          onClick={handleCelebrateClick}
          className="bg-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition duration-300"
        >
          Celebrate!
        </button>
      </div>
      <HeartGame />
    </div>
  );
}
