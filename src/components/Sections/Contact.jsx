import ScrollReveal from "../ScrollReveal";
import { FaGithub, FaLinkedinIn, FaDownload,  FaInstagram,} from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
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

        {/* Resume */}
        <div className="resume-wrapper">
          <a
            href="/Nihal_Resume.pdf"
            download
            className="resume-button"
          >
            <FaDownload />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Social Buttons */}
        <div className="social-buttons">

          <a
            href="https://github.com/nihalmv-ops"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button github"
          >
            <span className="social-icon">
              <FaGithub />
            </span>

            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/nihal-mv-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button linkedin"
          >
            <span className="social-icon">
              <FaLinkedinIn />
            </span>

            <span>LinkedIn</span>
          </a>

          <a
  href="https://www.instagram.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="social-button instagram"
>
  <span className="social-icon">
    <FaInstagram />
  </span>

  <span>Instagram</span>
</a>

        </div>
      </ScrollReveal>
    </section>
  );
}