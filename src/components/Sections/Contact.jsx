
import ScrollReveal from "../ScrollReveal";
import "./Contact.css";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section contact-section"
      style={{ minHeight: "80vh" }}
    >
      <ScrollReveal direction="up">
        <div className="eyebrow">Get in touch</div>

        <h2 className="section-title">
          Let's build something.
        </h2>

        <a
          href="mailto:nihalmv.dev@gmail.com"
          className="contact-email"
        >
          nihalmv.dev@gmail.com
        </a>

        {/* Resume Button */}
        <div className="resume-wrapper">
          <a
            href="/resume.pdf"
            download="Nihal-Resume.pdf"
            className="resume-button"
          >
            <span className="resume-icon">↓</span>
            <span>Download Resume</span>
            <span className="resume-shine"></span>
          </a>
        </div>

        <div className="contact-links">
          <a
            href="https://github.com/nihalmv-ops"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/nihal-mv-dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a href="https://www.instagram.com/niihalnico/">
            Instagram
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}


