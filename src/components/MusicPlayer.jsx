import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const startMusic = async () => {
      if (!audioRef.current) return;

      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked");
      }

      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.log("Playback failed");
      }
    }
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
      <audio
        ref={audioRef}
        src="/audio/background.mp3"
        loop
        preload="auto"
      />

      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: playing ? "#746b84" : "rgba(10,10,16,0.6)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {playing ? "🔊" : "🔇"}
      </button>
    </div>
  );
}