import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playMusic = async () => {
      try {
        audio.volume = 0;
        await audio.play();

        setPlaying(true);

        // Smooth fade in
        let volume = 0;
        const fade = setInterval(() => {
          volume += 0.05;

          if (volume >= 1) {
            volume = 1;
            clearInterval(fade);
          }

          audio.volume = volume;
        }, 100);
      } catch (err) {
        console.log("Playback blocked");
      }
    };

    // Preloader's "ENTER SITE" click bubbles up here
    window.addEventListener("click", playMusic, { once: true });

    return () => {
      window.removeEventListener("click", playMusic);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
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
        aria-label={playing ? "Play Music" : " Mute Music"} 
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,.15)",
          background: playing
            ? "rrgba(255,255,255,.15)"
            : "rgba(15,15,20,.65)",
          backdropFilter: "blur(15px)",
          color: "#fff",
          cursor: "pointer",
          fontSize: "22px",
          zIndex: 99999,
          transition: ".3s",
          boxShadow: playing
            ? "0 0 25px rgba(124,58,237,.45)"
            : "0 10px 25px rgba(0,0,0,.35)",
        }}
      >
        {playing ? "🔊" : "🔇"}
      </button>
    </>
  );
}