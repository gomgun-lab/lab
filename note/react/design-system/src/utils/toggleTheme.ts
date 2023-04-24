export const toggleTheme = () => {
  const htmlElement = document.documentElement;
  const currentColorMode = htmlElement.getAttribute("data-color-mode");

  if (currentColorMode === "light") {
    htmlElement.setAttribute("data-color-mode", "dark");
  } else {
    htmlElement.setAttribute("data-color-mode", "light");
  }
};

// localStorage ..
// https://github.com/daangn/seed-design/tree/main/packages/react-theming/src
