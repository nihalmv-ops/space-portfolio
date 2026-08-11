import ScrollReveal from "../ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="section" style={{ minHeight: "80vh" }}>
      <ScrollReveal direction="up">
        <div className="eyebrow">Get in touch</div>
        <h2 className="section-title">Let's build something.</h2>
        <a
          href="mailto:you@example.com"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            fontSize: "1.4rem",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
            paddingBottom: "0.3rem",
          }}
        >
          nihalmv.dev@gmail.com
        </a>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "3rem", opacity: 0.75 }}>
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
      </ScrollReveal>
    </section>
  );
}
