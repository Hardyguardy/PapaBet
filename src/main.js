import "./index.css";

// Функция для Show More
function toggleTextBlock(button) {
  const container = button.closest(".relative").parentElement;
  const textContent = container.querySelector(".text-content");
  const gradientOverlay = container.querySelector(".gradient-overlay");

  const isExpanded = textContent.style.maxHeight !== "100px";

  if (isExpanded) {
    // Сворачивание кнопки
    textContent.style.maxHeight = "100px";
    gradientOverlay.style.opacity = "1";
    button.textContent = "Show more";
  } else {
    // Разворачивание кнопки
    textContent.style.maxHeight = textContent.scrollHeight + "px";
    gradientOverlay.style.opacity = "0";
    button.textContent = "Show less";
  }
}

window.toggleTextBlock = toggleTextBlock;
