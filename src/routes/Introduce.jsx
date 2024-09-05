import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

const Introduce = () => {
  return (
    <Wrapper>
      <h1>Intro Page</h1>
    </Wrapper>
  );
};

export default Introduce;
