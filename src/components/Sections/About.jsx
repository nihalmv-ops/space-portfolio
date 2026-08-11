import ScrollReveal from "../ScrollReveal";

export default function About() {
  return (
    <section id="about" className="section">
      <ScrollReveal direction="up">
        <div className="eyebrow">About</div>
        <h2 className="section-title">
          I turn complex problems into clean, working software.
        </h2>
        <p className="section-text">
         I build modern, responsive interfaces using React,
JavaScript, and modern web technologies — with a focus
on clean code, thoughtful design, and exceptional user
experiences.<br></br> <br></br>

Always learning. Always building. Always evolving.
        </p>
      </ScrollReveal>
    </section>
  );
}
