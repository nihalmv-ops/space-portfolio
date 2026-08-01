

import { useRef, useState } from "react";

/**
 * Floating background-music toggle, bottom-right corner.
 * Just play / mute — nothing else.
 *
 * IMPORTANT — about the audio file:
 * This expects an MP3 at /public/audio/track.mp3.
 * Add your own licensed copy there, named exactly that, or update
 * the `src` path below to match your filename.
 *
 * Browsers block autoplay with sound until the user interacts with
 * the page, so this starts paused — click to play.
 */
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay/permission errors land here — safe to ignore,
        // button just stays in "paused" state.
      });
    }
    setPlaying(!playing);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 60,
      }}
    >
      <audio ref={audioRef} loop src="/audio/track.mp3" />

      <button
        onClick={toggle}
        aria-label={playing ? "Mute music" : "Play music"}
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: playing ? "#7c3aed" : "rgba(10,10,16,0.6)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
        }}
      >
        {playing ? "🔊" : "🔇"}
      </button>
    </div>
  );
}