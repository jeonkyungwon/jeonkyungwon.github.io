import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 5px 0;
  }
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    gap: 15px;
    font-size: 14px;
  }
`;

const MenuItem = styled.li`
  cursor: pointer;
  padding: 10px;
  border-bottom: 2px solid
    ${({ active }) => (active ? "black" : "transparent")};
  transition: border-color 0.3s;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Navbar = ({ currentSection, handleMenuClick }) => {
  const menuItems = ["Main", "Introduce", "Career", "Project", "Footer"];

  return (
    <NavbarContainer>
      <Menu>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            active={index === currentSection}
            onClick={() => handleMenuClick(index)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;
