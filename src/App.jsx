import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import SpaceScene from "./components/SpaceScene";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Sections/Hero";
import About from "./components/Sections/About";
import Projects from "./components/Sections/Projects";
import Skills from "./components/Sections/Skills";
import Contact from "./components/Sections/Contact";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />

      {/* Fixed infinite-space 3D background — stays put while page scrolls over it */}
      <SpaceScene />

      <Navbar />

      <SmoothScroll>
        <main className="content">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}

export default App;
