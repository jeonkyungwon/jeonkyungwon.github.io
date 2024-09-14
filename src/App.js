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

  @media (max-width: 768px) {
    overflow: auto;
  }
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

  // 터치 이벤트 관련 상태
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

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

  // 터치 시작 시 Y 좌표 저장
  const handleTouchStart = (event) => {
    touchStartY.current = event.touches[0].clientY;
  };

  // 터치 종료 시 Y 좌표 저장 및 방향 계산
  const handleTouchEnd = () => {
    if (isThrottled) return;
    setIsThrottled(true);

    const deltaY = touchStartY.current - touchEndY.current;

    if (deltaY > 50) {
      // 아래로 스크롤
      setCurrentSection((prev) => Math.min(prev + 1, sectionCount - 1));
    } else if (deltaY < -50) {
      // 위로 스크롤
      setCurrentSection((prev) => Math.max(prev - 1, 0));
    }

    setTimeout(() => setIsThrottled(false), 800);
  };

  const handleTouchMove = (event) => {
    touchEndY.current = event.touches[0].clientY;
  };

  useEffect(() => {
    const container = containerRef.current;

    // 데스크탑에서의 마우스 휠 스크롤 이벤트
    container.addEventListener("wheel", handleScroll);

    // 모바일에서의 터치 스크롤 이벤트
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("wheel", handleScroll);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
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
