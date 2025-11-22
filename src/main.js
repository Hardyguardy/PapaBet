import "./index.css";

// Header footer load

async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;

    // Инициализируем поиск после загрузки хедера
    if (elementId === "header-logged-container") {
      // Используем setTimeout чтобы дать браузеру время отрендерить HTML
      setTimeout(() => {
        initSearch();
      }, 100);
    }
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

// Функция инициализации поиска
function initSearch() {
  const searchButton = document.getElementById("search-button");
  const searchDropdown = document.getElementById("search-dropdown");
  const searchInput = document.getElementById("search-input");

  console.log("initSearch called", {
    searchButton,
    searchDropdown,
    searchInput,
  }); // Для отладки

  if (searchButton && searchDropdown && searchInput) {
    // Открытие/закрытие поиска
    searchButton.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Search button clicked"); // Для отладки
      searchDropdown.classList.toggle("hidden");
      if (!searchDropdown.classList.contains("hidden")) {
        searchInput.focus();
      }
    });

    // Закрытие при клике вне меню
    document.addEventListener("click", (e) => {
      if (
        !searchButton.contains(e.target) &&
        !searchDropdown.contains(e.target)
      ) {
        searchDropdown.classList.add("hidden");
      }
    });

    // Предотвращение закрытия при клике внутри меню
    searchDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  } else {
    console.error("Search elements not found!"); // Для отладки
  }
}

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
