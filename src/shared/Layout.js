import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderStyles = styled.div`
  max-width: 100%;
  min-width: 400px;
  background-color: black;
  height: 50px;
  display: flex;
  align-items: center;
  color: white;
  padding-left: 40px;
  padding-right: 40px;
  font-weight: 60px;
  font-size: 20px;
  justify-content: space-between;
`;
const LayoutStyles = styled.div`
  display: flex;
  align-items: center;
  color: white;
  flex-direction: column;
  justify-content: center;
`;

const HeaderButton = styled.button`
  &:hover {
    font-size: 22px;
  }
  background-color: transparent;
  color: white;
  font-weight: 60px;
  font-size: 20px;
  transition: font-size 0.5s ease-in-out;
`;

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderStyles>
      <HeaderButton onClick={() => navigate("/")}> Home</HeaderButton>
      <span>My playlist</span>
    </HeaderStyles>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <LayoutStyles>{children} </LayoutStyles>
    </div>
  );
}

export default Layout;
