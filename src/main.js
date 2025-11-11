import "./index.css";

// Header footer load

async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-container", "/src/components/header.html");
  loadComponent(
    "header-logged-container",
    "/src/components/header-logged.html"
  );
  loadComponent("footer-container", "/src/components/footer.html");
});

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
