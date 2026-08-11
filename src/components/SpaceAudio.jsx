import { useRef, useState } from "react";

export default function SpaceAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Blocked by browser autoplay policy until a user gesture.
      });
    }
    setPlaying(!playing);
  };

  return (
    <div style={{ position: "absolute", bottom: "2rem", right: "2rem", zIndex: 60, pointerEvents: "auto" }}>
      <audio ref={audioRef} loop src="/audio/track.mp3" />
      <button
        onClick={toggle}
        aria-label={playing ? "Play music" : "Mute music"}
        style={{
          width: 44, height: 44, borderRadius: "50%",
          background: playing ? "#7c3aed" : "rgba(10,10,16,0.6)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)", color: "#fff", fontSize: "1.1rem",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {playing ? "🔊" : "🔇"}
      </button>
    </div>
  );
}