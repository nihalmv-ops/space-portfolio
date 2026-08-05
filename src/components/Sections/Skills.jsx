import ScrollReveal from "../ScrollReveal";
import "./Skills.css";

import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiThreedotjs,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiVite,
  SiGreensock,
  SiTailwindcss,
} from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact /> },
  { name: "Three.js", icon: <SiThreedotjs /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "GSAP", icon: <SiGreensock /> },
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "Vite", icon: <SiVite /> },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section section">
      <ScrollReveal direction="left">

        <p className="skills-eyebrow">
          MY TOOLKIT
        </p>

        <h2 className="skills-title">
          Technologies I Use
        </h2>

        <p className="skills-subtitle">
          Modern technologies used to build fast,
          scalable and immersive web applications.
        </p>

      <div className="skills-grid">
  {skills.map((skill) => (
    <div
      key={skill.name}
      className="skill-card"
    >
      <div className="skill-icon">
        {skill.icon}
      </div>

      <span className="skill-name">
        {skill.name}
      </span>
    </div>
  ))}
</div>

      </ScrollReveal>
    </section>
  );
}