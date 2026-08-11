
import "./Projects.css";

export default function ProjectCard({ project }) {
  if (!project) return null;

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <article className="project-card">
      {/* Animated Glow Border */}
      <div className="project-card__glow" />

      {/* Project Image */}
      <div className="project-image">
        {project.image && (
          <img
            src={project.image}
            alt={project.title || "Project"}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        {/* Hover Overlay */}
        <div className="project-overlay">
          <span>🚀 Explore Project</span>
        </div>
      </div>

      {/* Content */}
      <div className="project-content">
        <h3 className="project-title">
          {project.title}
        </h3>

        <p className="project-desc">
          {project.desc}
        </p>

        {/* Tech Stack */}
        {Array.isArray(project.tags) && project.tags.length > 0 && (
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="project-tag"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="project-buttons">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn github"
              onClick={handleLinkClick}
            >
              GitHub
            </a>
          )}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn live"
              onClick={handleLinkClick}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Floating Stars */}
      <span className="star star-1" />
      <span className="star star-2" />
      <span className="star star-3" />
      <span className="star star-4" />
      <span className="star star-5" />
    </article>
  );
}

