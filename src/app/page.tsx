"use client"; // For Next.js 13+ App Router (or harmless in Pages Router)

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, LockKeyhole, Star } from "lucide-react";

// Install react-confetti if you haven't already: npm install react-confetti
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

/* ------------------------------------------------------------------
   1) Mini-Game: CatchTheHeartGame
   ------------------------------------------------------------------ */
function CatchTheHeartGame() {
  const [score, setScore] = useState(0);
  const [heartPosition, setHeartPosition] = useState({ top: 50, left: 50 });
  const [gameOver, setGameOver] = useState(false);

  const moveHeart = () => {
    const newTop = Math.random() * 80; // 0% to 80%
    const newLeft = Math.random() * 80;
    setHeartPosition({ top: newTop, left: newLeft });
  };

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
    <div className="mt-4 p-4 bg-white rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Catch the Heart!</h2>
      <p className="text-center mb-4">Score: {score}</p>
      <div className="relative h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
        {!gameOver && (
          <div
            onClick={handleHeartClick}
            style={{
              position: "absolute",
              top: `${heartPosition.top}%`,
              left: `${heartPosition.left}%`,
            }}
            className="text-4xl cursor-pointer select-none"
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
          Here&apos;s a secret message: You&apos;re the love of my life, and
          I&apos;m so excited for all our adventures together!
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   2) Main Birthday Page
   ------------------------------------------------------------------ */
const loveNotes = [
  "Click the heart",
  "The way you laugh makes my day brighter",
  "I enjoy our sleep calls",
  "I enjoy playing valo with you",
  "I enjoy talking to you ",
  "You make me feel loved and special",
  "Click on the button below to see a surprise"
];

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentNote, setCurrentNote] = useState(0);
  const [heartScale, setHeartScale] = useState(1);

  // State for the modals
  const [showSecret, setShowSecret] = useState(false);
  const [showPicture, setShowPicture] = useState(false);
  const [showGame, setShowGame] = useState(false);

  // Create floating hearts
  const createHearts = () => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        animationDelay: `${i * 0.2}s`,
      },
    }));
  };

  // Heart (center) => confetti + cycle love notes
  const handleHeartClick = () => {
    setHeartScale(1.3);
    setShowConfetti(true);
    setTimeout(() => {
      setHeartScale(1);
      setShowConfetti(false);
    }, 800);

    setCurrentNote((prev) => (prev + 1) % loveNotes.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {createHearts().map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-2xl -translate-y-full heart-animate"
            style={heart.style}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: ["100vh", "-100vh"],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative space-y-8 max-w-2xl text-center"
      >
        {/* Header */}
        <div className="space-y-4">
          <motion.div
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Sparkles className="w-12 h-12 text-rose-400 mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            Happy Birthday, Beautiful 🌸
          </h1>
          <p className="text-lg text-rose-700">
            Celebrating You &amp; Our New Beginning
          </p>
        </div>

        {/* Interactive Heart (center) */}
        <motion.div
          className="relative w-48 h-48 mx-auto cursor-pointer"
          onClick={handleHeartClick}
          animate={{ scale: heartScale }}
          transition={{ type: "spring" }}
        >
          <Heart className="absolute inset-0 w-full h-full text-rose-400 fill-rose-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Love Notes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNote}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="text-xl text-rose-700 min-h-[60px] px-4"
          >
            &quot;{loveNotes[currentNote]}&quot;
          </motion.div>
        </AnimatePresence>

        {/* Buttons Section */}
        <div className="flex flex-col items-center gap-4">
          {/* Secret Message Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-rose-500/90 text-white px-6 py-2 rounded-full flex items-center gap-2"
            onClick={() => setShowSecret(true)}
          >
            <LockKeyhole className="w-4 h-4" />
            Open Special Message
          </motion.button>

          {/* Play the Heart Game Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 text-white px-6 py-2 rounded-full"
            onClick={() => setShowGame(true)}
          >
            Play the Heart Game
          </motion.button>
        </div>

        {/* Future Moments Section */}
        <div className="space-y-4 bg-white/30 p-6 rounded-xl backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-rose-700">
            Our Upcoming Firsts
          </h2>
          <ul className="space-y-2 text-rose-600 text-left max-w-xs mx-auto">
            <li>⭐ First movie night</li>
            <li>🎉 First game night</li>
            <li>🍰 First Birthday with you</li>
          </ul>
        </div>
      </motion.div>

      {/* Secret Message Modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowSecret(false)} // click background to close
          >
            <motion.div
              className="bg-white p-8 rounded-2xl max-w-md text-center relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()} // don't close if clicked inside
            >
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-rose-600 mb-4">
                Just Between Us 💞
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Hmmm, idk what to say but I LOVE YOUUUUUUUUUUU!!!!!!!!! 💗💗💗
              </p>

              {/* Button to show the surprise picture */}
              <button
                className="bg-rose-500/90 text-white px-4 py-2 mt-6 rounded-full"
                onClick={() => setShowPicture(true)}
              >
                Show Surprise Picture
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Surprise Picture Modal */}
      <AnimatePresence>
        {showPicture && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPicture(false)}
          >
            <motion.div
              className="bg-white p-4 rounded-2xl max-w-sm text-center relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Replace with your own image or local file in /public */}
              <img
                src="\image.png"
                alt="Surprise"
                className="mx-auto rounded-lg"
              />
              <p className="text-rose-600 mt-2">😓😓😓</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Catch the Heart Game Modal */}
      <AnimatePresence>
        {showGame && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGame(false)}
          >
            <motion.div
              className="bg-white p-4 rounded-2xl max-w-md w-full text-center relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CatchTheHeartGame />
              <button
                className="mt-4 bg-rose-500/90 text-white px-4 py-2 rounded-full"
                onClick={() => setShowGame(false)}
              >
                Close Game
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      {showConfetti && (
        <ReactConfetti
          numberOfPieces={200}
          recycle={false}
          gravity={0.3}
          className="fixed inset-0"
        />
      )}

      {/* Ambient Music */}
      <audio autoPlay loop className="hidden">
        <source src="/soft-piano.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
