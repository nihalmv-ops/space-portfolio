import { useEffect, useRef, useState } from "react";

export default function SpaceAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.45;
    audio.loop = true;

    const startMusic = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked");
      }

      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
      window.removeEventListener("keydown", startMusic);
    };

    window.addEventListener("click", startMusic, { once: true });
    window.addEventListener("touchstart", startMusic, { once: true });
    window.addEventListener("keydown", startMusic, { once: true });

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
      window.removeEventListener("keydown", startMusic);
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
        console.log(err);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background.mp3"
        preload="auto"
        loop
      />

      <button
        onClick={toggle}
        aria-label="Music Toggle"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "none",
          outline: "none",
          cursor: "pointer",
          zIndex: 9999,
          background: playing
            ? "rgba(124,58,237,0.95)"
            : "rgba(15,15,20,0.75)",
          color: "#fff",
          backdropFilter: "blur(14px)",
          boxShadow:
            "0 0 25px rgba(124,58,237,.45)",
          fontSize: "22px",
          transition: "0.35s",
        }}
      >
        {playing ? "🔊" : "🔇"}
      </button>
    </>
  );
}