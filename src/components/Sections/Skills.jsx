import ScrollReveal from "../ScrollReveal";

const skills = ["React", "Three.js", "Node.js", "TypeScript", "Framer Motion", "Vite", "Tailwind", "Python"];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <ScrollReveal direction="left">
        <div className="eyebrow">Toolkit</div>
        <h2 className="section-title">Skills</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.8rem",
            marginTop: "1.5rem",
          }}
        >
          {skills.map((s) => (
            <span
              key={s}
              style={{
                padding: "0.6rem 1.2rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: "0.9rem",
                color: "#d4d4dc",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
