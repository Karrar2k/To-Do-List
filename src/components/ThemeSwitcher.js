import React, { useState } from "react";
import styled from "styled-components";

const ThemeSwitcherContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
`;

const PaletteIcon = styled.span`
  font-size: 24px;
  animation: wiggle 1s infinite ease-in-out alternate;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  @keyframes wiggle {
    0% {
      transform: rotate(-15deg);
    }
    100% {
      transform: rotate(15deg);
    }
  }
`;

const ThemeMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: var(--house-bg, #fdbbc6);
  border: 2px solid var(--accent-color, #551941);
  border-radius: 8px;
  padding: 10px;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: row; /* Align themes horizontally */
  gap: 10px;
  z-index: 1000; /* Ensure it stays above everything */
`;

const ThemeOption = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.color};

  &:hover {
    transform: scale(1.2);
  }
`;

const themes = {
  A: {
    "--main-bg": "#53AAFF",
    "--house-bg": "#A8D4FF",
    "--main-accent": "#FF4D00",
    "--tasklist-bg": "#94BBE1",
    "--font-family": "'Iceberg', sans-serif",
    "--slct-accent": "#F98655",
  },

  B: {
    "--main-bg": "#EEB994",
    "--house-bg": "#F4DDCD",
    "--main-accent": "#296166",
    "--tasklist-bg": "#D8C5B7",
    "--font-family": "'Germania One', sans-serif",
    "--slct-accent": "#45A5AD",
  },
  C: {
    "--main-bg": "#51B595",
    "--house-bg": "#95DAC4",
    "--main-accent": "#9636BC",
    "--tasklist-bg": "#82BDAA",
    "--font-family": "'Jaro', sans-serif",
    "--slct-accent": "#D775FE",
  },
  D: {
    "--main-bg": "#EAA8C2",
    "--house-bg": "#FDBBC6",
    "--main-accent": "#551941",
    "--tasklist-bg": "#C8929B",
    "--font-family": "'Koulen', sans-serif",
    "--slct-accent": "#972D74",
  },
};

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <ThemeSwitcherContainer>
      <PaletteIcon onClick={() => setIsOpen(!isOpen)}>🎨</PaletteIcon>
      <ThemeMenu isOpen={isOpen}>
        {Object.keys(themes).map((themeKey) => (
          <ThemeOption
            key={themeKey}
            color={themes[themeKey]["--main-bg"]}
            borderColor={themes[themeKey]["--main-accent"]}
            onClick={() => {
              applyTheme(themeKey);
              setIsOpen(false);
            }}
          />
        ))}
      </ThemeMenu>
    </ThemeSwitcherContainer>
  );
};

export default ThemeSwitcher;
