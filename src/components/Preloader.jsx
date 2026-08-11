
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Preloader.css";

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);

  // Background music
  const audioRef = useRef(null);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 4 + 1;

      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        setTimeout(() => {
          setReady(true);
        }, 500);
      }

      setProgress(value);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    // Start background music from the user's click
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/background.mp3");

      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
      audioRef.current.preload = "auto";
    }

    audioRef.current
      .play()
      .catch((error) => {
        console.log("Audio could not start:", error);
      });

    // Start cinematic transition
    setStarted(true);

    setTimeout(() => {
      onDone?.();
    }, 1300);
  };

  return (
    <AnimatePresence>
      {!started && (
        <motion.div
          className="premium-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(18px)",
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Deep space background */}
          <div className="loader-space" />

          {/* Nebula layers */}
          <div className="loader-nebula nebula-one" />
          <div className="loader-nebula nebula-two" />

          {/* Stars */}
          <div className="loader-stars">
            {Array.from({ length: 90 }).map((_, i) => (
              <span
                key={i}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${2 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Golden cinematic light */}
          <motion.div
            className="loader-sun-glow"
            animate={{
              scale: ready ? 1.25 : 0.75,
              opacity: ready ? 0.8 : 0.18,
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          />

          {/* Center content */}
          <motion.div
            className="loader-content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="loader-small-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              WELCOME TO
            </motion.div>

            <motion.h1
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.1)",
                  "0 0 35px rgba(255,255,255,0.35)",
                  "0 0 10px rgba(255,255,255,0.1)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              NMV
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              REACT DEVELOPER
            </motion.p>

            {/* Loading */}
            {!ready && (
              <div className="loader-progress-wrapper">
                <div className="loader-percent">
                  {Math.floor(progress)}
                  <span>%</span>
                </div>

                <div className="loader-line">
                  <motion.div
                    className="loader-line-progress"
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  />
                </div>

                <div className="loader-status">
                  INITIALIZING UNIVERSE
                </div>
              </div>
            )}

            {/* Get started */}
            {ready && (
              <motion.div
                className="start-wrapper"
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                <motion.button
                  className="start-button"
                  onClick={handleStart}
                  whileHover={{
                    scale: 1.06,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  <span>ENTER THE UNIVERSE</span>

                  <span className="button-arrow">
                    →
                  </span>
                </motion.button>

                <div className="start-hint">
                  CLICK TO EXPLORE
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Bottom cinematic text */}
          <div className="loader-bottom">
            <span>SCROLL • EXPLORE • CREATE</span>
            <span>© 2026 NMV</span>
          </div>

          {/* Transition flash */}
          {started && (
            <motion.div
              className="loader-flash"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.4, 2],
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

