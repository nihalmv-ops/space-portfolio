export default function Navbar() {
  const links = ["About", "Projects", "Skills", "Contact"];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem 6vw",
        mixBlendMode: "difference",
      }}
    >
      <a href="#hero" style={{ fontFamily: "Space Grotesk", fontWeight: 600, fontSize: "1.1rem" }}>
        NMV
      </a>
      <div style={{ display: "flex", gap: "2.2rem" }}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{ fontSize: "0.9rem", opacity: 0.85 }}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
