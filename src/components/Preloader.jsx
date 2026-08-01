import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15;

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setProgress(100);
            setLoadingDone(true);
          }, 300);

          return 100;
        }

        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const enterSite = () => {
    onDone?.();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background:
            "radial-gradient(circle at top, #14142b 0%, #05050b 55%, #000000 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            color: "#fff",
            fontSize: "clamp(2.5rem,6vw,5rem)",
            fontWeight: 700,
            marginBottom: 10,
            letterSpacing: "2px",
          }}
        >
          NIHAL
        </motion.h1>

        {!loadingDone ? (
          <>
            <motion.div
              style={{
                color: "#ffffff",
                fontSize: "2rem",
                fontWeight: 600,
                marginBottom: 25,
              }}
            >
              {Math.floor(progress)}%
            </motion.div>

            <div
              style={{
                width: 260,
                height: 5,
                borderRadius: 20,
                background: "#222",
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(90deg,#7c3aed,#a855f7,#c084fc)",
                }}
              />
            </div>
          </>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 35px rgba(124,58,237,.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={enterSite}
            style={{
              marginTop: 40,
              padding: "16px 40px",
              borderRadius: 50,
              border: "1px solid rgba(255,255,255,.2)",
              background: "rgba(124,58,237,.18)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              backdropFilter: "blur(15px)",
            }}
          >
            ✨ ENTER SITE
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}