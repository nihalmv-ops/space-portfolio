import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "../ScrollReveal";

import "./Projects.css";

import ProjectCard from "./ProjectCard";
import projects from "./project";

export default function Projects() {
  return (
    <section
      id="projects"
      className="projects-section section"
    >
      <ScrollReveal direction="right">
        <p className="projects-eyebrow">
          Selected Work
        </p>

        <h2 className="projects-title">
          Featured Projects
        </h2>

        <p className="projects-subtitle">
          A collection of modern full-stack web
          applications, interactive 3D experiences,
          and production-ready MERN projects.
        </p>
      </ScrollReveal>

      <StaggerContainer stagger={0.15}>
        <div className="projects-grid">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}