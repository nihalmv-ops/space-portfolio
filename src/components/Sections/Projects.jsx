
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "../ScrollReveal";

import "./Projects.css";
import ProjectCard from "./ProjectCard";
import projects from "./Project";
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
          Explore a selection of projects where I combine
          React, modern UI, animation, and clean engineering
          to build digital experiences that are functional,
          responsive, and memorable.
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

