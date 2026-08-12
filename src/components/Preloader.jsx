import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Preloader.css";

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);

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
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/background.mp3");

      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
      audioRef.current.preload = "auto";
    }

    audioRef.current.play().catch((error) => {
      console.log("Audio could not start:", error);
    });

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
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          {/* =================================
              SPACE IMAGE
          ================================= */}

          <div className="loader-space-image" />

          {/* Dark cinematic overlay */}
          <div className="loader-dark-overlay" />

          {/* Purple atmospheric glow */}
          <motion.div
            className="loader-purple-glow"
            animate={{
              opacity: ready ? 0.65 : 0.35,
              scale: ready ? 1.15 : 1,
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          />

          {/* Golden sun glow */}
          <motion.div
            className="loader-sun-glow"
            animate={{
              opacity: ready ? 0.85 : 0.35,
              scale: ready ? 1.2 : 0.85,
            }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
            }}
          />

          {/* =================================
              STARS
          ================================= */}

          <div className="loader-stars">
            {Array.from({ length: 70 }).map((_, i) => (
              <span
                key={i}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${2 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* =================================
              MAIN CONTENT
          ================================= */}

          <motion.div
            className="loader-content"
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
          >
            {/* Small intro */}

            <motion.p
              className="hero-eyebrow"
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
            >
              HELLO, I'M
            </motion.p>

            {/* Name */}

            <motion.h1
              className="hero-title"
              initial={{
                opacity: 0,
                y: 25,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 0.45,
                duration: 1,
              }}
            >
              NIHAL <span>MV</span>
            </motion.h1>

            {/* Description */}

            <motion.p
              className="hero-description"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 0.9,
              }}
            >
              I build immersive web experiences with
              modern technologies, creative design and
              interactive 3D experiences.
            </motion.p>

            {/* =================================
                LOADING
            ================================= */}

            {!ready && (
              <motion.div
                className="loader-progress-wrapper"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.9,
                }}
              >
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
              </motion.div>
            )}

            {/* =================================
                ENTER BUTTON
            ================================= */}

            {ready && (
              <motion.div
                className="start-wrapper"
                initial={{
                  opacity: 0,
                  y: 25,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.9,
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

          {/* =================================
              BOTTOM
          ================================= */}

          <div className="loader-bottom">
            <span>SCROLL • EXPLORE • CREATE</span>
            <span>© 2026 NIHAL MV</span>
          </div>

          {/* =================================
              CINEMATIC FLASH
          ================================= */}

          {started && (
            <motion.div
              className="loader-flash"
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0.5, 1.5, 2.2],
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