import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Main from "./routes/Main";
import Career from "./routes/Career";
import Project from "./routes/Project";
import Introduce from "./routes/Introduce";
import Footer from "./routes/Footer";
import Navbar from "./components/Navbar"; // Navbar import

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
`;

const IndicatorContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Indicator = styled.div`
  width: ${({ active }) => (active ? "15px" : "10px")};
  height: ${({ active }) => (active ? "15px" : "10px")};
  background-color: ${({ active }) => (active ? "black" : "gray")};
  border-radius: 50%;
  transition: width 0.3s, height 0.3s, background-color 0.3s;
  cursor: pointer;
  position: relative;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

function App() {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isThrottled, setIsThrottled] = useState(false);
  const sectionCount = 5;

  const handleScroll = useCallback(
    (event) => {
      if (isThrottled) return;
      setIsThrottled(true);

      const deltaY = event.deltaY;

      if (deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sectionCount - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => setIsThrottled(false), 800);
    },
    [isThrottled, sectionCount]
  );

  useEffect(() => {
    const container = containerRef.current;

    container.addEventListener("wheel", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const container = containerRef.current;

    container.scrollTo({
      top: currentSection * window.innerHeight,
      behavior: "smooth",
    });
  }, [currentSection]);

  const handleIndicatorClick = (index) => {
    setCurrentSection(index);
  };

  return (
    <Container ref={containerRef}>
      <Navbar
        currentSection={currentSection}
        handleMenuClick={handleIndicatorClick}
      />{" "}
      {/* 반응형 Navbar */}
      <Section>
        <Main />
      </Section>
      <Section>
        <Introduce />
      </Section>
      <Section>
        <Career />
      </Section>
      <Section>
        <Project />
      </Section>
      <Section>
        <Footer />
      </Section>
      <IndicatorContainer>
        {Array.from({ length: sectionCount }).map((_, index) => (
          <Indicator
            key={index}
            active={index === currentSection}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </IndicatorContainer>
    </Container>
  );
}

export default App;
