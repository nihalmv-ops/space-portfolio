import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Preloader.css";

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += Math.random() * 8 + 3;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);

        setTimeout(() => {
          setLoadingDone(true);
        }, 500);
      }

      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setEntering(true);

    setTimeout(() => {
      onDone?.();
    }, 1100);
  };

  return (
    <AnimatePresence mode="wait">
      {!loadingDone ? (
        /* =========================
           PROFESSIONAL LOADING
        ========================= */
        <motion.div
          key="loading"
          className="professional-loader"
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <div className="loader-center">

            <motion.div
              className="loader-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              NMV
            </motion.div>

            <div className="loader-loading-text">
              LOADING PORTFOLIO
            </div>

            <div className="loader-progress">
              <motion.div
                className="loader-progress-bar"
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              />
            </div>

            <div className="loader-bottom-row">
              <span>PLEASE WAIT</span>

              <span>
                {Math.floor(progress)}
                <small>%</small>
              </span>
            </div>

          </div>

          <div className="loader-corner">
            PORTFOLIO / 2026
          </div>
        </motion.div>
      ) : (
        /* =========================
           INTRO / SPACE SCREEN
        ========================= */
        <motion.div
          key="intro"
          className="intro-screen"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
          }}
        >

          {/* HERO IMAGE */}
          <div className="intro-background">
            <img
              src="/hero-space.png"
              alt=""
            />
          </div>

          {/* Dark cinematic overlay */}
          <div className="intro-overlay" />

          {/* Subtle glow */}
          <div className="intro-glow" />

          {/* CONTENT */}
          <motion.div
            className="intro-content"
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
              delay: 0.3,
              ease: "easeOut",
            }}
          >

            <motion.p
              className="hero-eyebrow"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
            >
              HELLO, I'M
            </motion.p>

            <motion.h1
              className="hero-title"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.7,
              }}
            >
              NIHAL <span>MV</span>
            </motion.h1>

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
                duration: 0.9,
                delay: 0.9,
              }}
            >
              I build immersive web experiences with
              modern technologies, creative design and
              interactive 3D experiences.
            </motion.p>

            {/* ENTER BUTTON */}
            <motion.button
              className="hero-button"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.2,
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={handleEnter}
            >
              <span>ENTER THE UNIVERSE</span>

              <span className="hero-button-arrow">
                →
              </span>
            </motion.button>

          </motion.div>

          {/* Bottom text */}
          <motion.div
            className="intro-footer"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.6,
            }}
            transition={{
              delay: 1.5,
            }}
          >
            <span>SCROLL • EXPLORE • CREATE</span>
            <span>© 2026 NIHAL MV</span>
          </motion.div>

          {/* CINEMATIC ENTER TRANSITION */}
          {entering && (
            <motion.div
              className="enter-transition"
              initial={{
                opacity: 0,
                scale: 0.4,
              }}
              animate={{
                opacity: [0, 0.8, 1],
                scale: [0.4, 1.3, 2.5],
              }}
              transition={{
                duration: 1.1,
                ease: "easeInOut",
              }}
            />
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
}