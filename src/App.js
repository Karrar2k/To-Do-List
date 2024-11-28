import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import House from "./components/House";
import ThemeSwitcher from "./components/ThemeSwitcher";

// Global styles for resetting and consistent styling
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    background: var(--main-bg);
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; /* Required for ThemeSwitcher positioning */
  }
`;

// Styled container for app layout and centering content
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Wrapper for ThemeSwitcher to ensure correct placement
const ThemeSwitcherWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000; /* Keeps it above other elements */
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ThemeSwitcherWrapper>
          <ThemeSwitcher />
        </ThemeSwitcherWrapper>
        <House />
      </AppContainer>
    </>
  );
}

export default App;
