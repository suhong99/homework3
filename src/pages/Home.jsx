// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const HomeNavi = styled.div`
  width: 400px;
  border: 1px solid black;
  /* background-color: green; */
  border-radius: 5px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    font-size: 22px;
  }
`;
const HomeContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin: 20px auto;
  /* background-color: red; */
`;

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <HomeContainer>
        <HomeNavi onClick={() => navigate("/Write")}>영상 추천 </HomeNavi>
        {/* <div>dd</div> */}
        <HomeNavi onClick={() => navigate("/RecommendList")}>
          추천 리스트
        </HomeNavi>
      </HomeContainer>
    </div>
  );
}

export default Home;
