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
          A few years into building for the web, I care most about the
          details most people scroll past — the timing of an animation, the
          weight of a headline, the feel of a page as it loads. This site is
          built with React, Three.js, and Framer Motion.
        </p>
      </ScrollReveal>
    </section>
  );
}
