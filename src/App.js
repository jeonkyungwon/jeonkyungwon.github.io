import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Main from "./routes/Main";
import Career from "./routes/Career";
import Project from "./routes/Project";
import Introduce from "./routes/Introduce";
import Footer from "./routes/Footer";

const Container = styled.div`
  height: 100vh;
  overflow: hidden; /* 스크롤바를 숨김 */
`;

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start; /* 섹션 스냅을 위해 추가 */
`;

function App() {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isThrottled, setIsThrottled] = useState(false); // 스로틀링 상태 추가
  const sectionCount = 5; // 섹션의 수

  const handleScroll = useCallback(
    (event) => {
      if (isThrottled) return; // 스로틀링 중일 때는 무시
      setIsThrottled(true); // 스로틀링 시작

      const deltaY = event.deltaY;

      if (deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sectionCount - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      // 일정 시간 후 스로틀링 해제
      setTimeout(() => setIsThrottled(false), 800); // 800ms 후에 스로틀링 해제
    },
    [isThrottled, sectionCount]
  ); // handleScroll의 종속성 설정

  useEffect(() => {
    const container = containerRef.current;

    container.addEventListener("wheel", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]); // handleScroll을 의존성으로 추가

  useEffect(() => {
    const container = containerRef.current;

    container.scrollTo({
      top: currentSection * window.innerHeight,
      behavior: "smooth",
    });
  }, [currentSection]);

  return (
    <Container ref={containerRef}>
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
    </Container>
  );
}

export default App;
