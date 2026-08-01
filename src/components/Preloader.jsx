import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

useEffect(() => {
  const interval = setInterval(() => {
    setProgress((p) => {
      const next = p + Math.random() * 18;

      if (next >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          setVisible(false);

          // Notify App that loading is complete
          onDone?.();

        }, 400);

        return 100;
      }

      return next;
    });
  }, 140);

  return () => clearInterval(interval);
}, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "#030308",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(3rem, 10vw, 6rem)",
              fontWeight: 600,
              color: "#f2f2f5",
            }}
          >
            {Math.floor(progress)}%
          </motion.div>
          <div
            style={{
              width: 220,
              height: 2,
              background: "#1a1a24",
              marginTop: 24,
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "#7c3aed",
                width: `${progress}%`,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
