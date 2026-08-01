import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="section"
      style={{ alignItems: "flex-start", justifyContent: "center" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="eyebrow">Portfolio — 2026</div>
        <h1
          style={{
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            lineHeight: 1.02,
            maxWidth: 900,
          }}
        >
          Building things
          <br />
          in the space
          <br />
          between ideas.
        </h1>
        <p className="section-text" style={{ marginTop: "2rem" }}>
          I'm a developer crafting immersive, modern web experiences — where
          design, motion, and code meet.
        </p>
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          bottom: "6vh",
          left: "8vw",
          fontSize: "0.8rem",
          opacity: 0.6,
          letterSpacing: "0.1em",
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        SCROLL TO EXPLORE ↓
      </motion.div>
    </section>
  );
}
