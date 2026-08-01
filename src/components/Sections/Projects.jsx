import ScrollReveal, { StaggerContainer, StaggerItem } from "../ScrollReveal";

/**
 * ============ EDIT YOUR PROJECT DATA HERE ============
 * image:      put your screenshot/thumbnail in the /public/projects folder
 *             (create that folder if it doesn't exist) and reference it as
 *             "/projects/filename.jpg" — Vite serves anything in /public as-is.
 * githubLink: link to the GitHub repo. Leave as "" to hide that button.
 * liveLink:   link to the live/deployed demo. Leave as "" to hide that button.
 * tags:       short stack/tech labels shown under the title
 */
const projects = [
  {
    id: 1,
    title: "Project One",
    desc: "A short description of what this project does and the problem it solves.",
    image: "/projects/project-1.jpg",
    tags: ["React", "Node.js"],
    githubLink: "https://github.com/your-username/project-one",
    liveLink: "https://project-one-demo.vercel.app",
  },
  {
    id: 2,
    title: "Project Two",
    desc: "A short description of what this project does and the problem it solves.",
    image: "/projects/project-2.jpg",
    tags: ["Next.js", "MongoDB"],
    githubLink: "https://github.com/your-username/project-two",
    liveLink: "https://project-two-demo.vercel.app",
  },
  {
    id: 3,
    title: "Project Three",
    desc: "A short description of what this project does and the problem it solves.",
    image: "/projects/project-3.jpg",
    tags: ["Three.js", "WebGL"],
    githubLink: "https://github.com/your-username/project-three",
    liveLink: "https://project-three-demo.vercel.app",
  },
];

function ProjectCard({ p }) {
  return (
    <div
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(6px)",
        overflow: "hidden",
        transition: "transform 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Image area — shows your screenshot, or a placeholder gradient
          if the image file isn't there yet */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          background: "linear-gradient(135deg, #1a1030, #2a1550)",
          position: "relative",
        }}
      >
        <img
          src={p.image}
          alt={p.title}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div style={{ padding: "1.6rem" }}>
        <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{p.title}</h3>
        <p style={{ color: "#a3a3af", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1rem" }}>
          {p.desc}
        </p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.4rem" }}>
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.75rem",
                padding: "0.3rem 0.7rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#c4b5fd",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "0.8rem" }}>
          {p.githubLink && (
            <a
              href={p.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "0.65rem 1rem",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#f2f2f5",
                transition: "background 0.25s ease, border-color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              GitHub
            </a>
          )}

          {p.liveLink && (
            <a
              href={p.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "0.65rem 1rem",
                borderRadius: "8px",
                border: "1px solid transparent",
                background: "#7c3aed",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#fff",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#8b5cf6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#7c3aed";
              }}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <ScrollReveal direction="right">
        <div className="eyebrow">Selected Work</div>
        <h2 className="section-title">Projects</h2>
      </ScrollReveal>

      <StaggerContainer stagger={0.15}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {projects.map((p) => (
            <StaggerItem key={p.id}>
              <ProjectCard p={p} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}
