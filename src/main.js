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

  // ВАЖНО: Вызываем инициализацию дропдаунов
  initCustomDropdowns();
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

// Открытие тултипа пароля
document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("toggle-password");
  const passwordInput = document.getElementById("password-input");
  const passwordTooltip = document.getElementById("password-tooltip");

  // Переключение видимости пароля
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
    });
  }

  // Показать подсказку при фокусе
  if (passwordInput && passwordTooltip) {
    passwordInput.addEventListener("focus", () => {
      passwordTooltip.classList.remove("hidden");
    });

    // Скрыть подсказку при потере фокуса
    passwordInput.addEventListener("blur", () => {
      setTimeout(() => {
        passwordTooltip.classList.add("hidden");
      }, 200);
    });
  }
});

// Функция инициализации кастомных дропдаунов
function initCustomDropdowns() {
  console.log("initCustomDropdowns called");

  // === DEPOSIT PAGE (crypto) ===
  const currencyButton = document.getElementById("currency-button");
  const currencyDropdown = document.getElementById("currency-dropdown");
  const currencySelected = document.getElementById("currency-selected");
  const currencyOptions = document.querySelectorAll(".currency-option");
  const currencySearch = document.getElementById("currency-search");

  const networkButton = document.getElementById("network-button");
  const networkDropdown = document.getElementById("network-dropdown");
  const networkSelected = document.getElementById("network-selected");
  const networkOptions = document.querySelectorAll(".network-option");

  // === DEPOSIT BANK PAGE ===
  const currencyButtonBank = document.getElementById("currency-button-bank");
  const currencyDropdownBank = document.getElementById(
    "currency-dropdown-bank"
  );
  const currencySelectedBank = document.getElementById(
    "currency-selected-bank"
  );
  const currencyOptionsBank = document.querySelectorAll(
    ".currency-option-bank"
  );
  const currencySearchBank = document.getElementById("currency-search-bank");

  // === DEPOSIT WITHDRAWAL PAGE ===
  const withdrawalMethodButton = document.getElementById(
    "withdrawal-method-button"
  );
  const withdrawalMethodDropdown = document.getElementById(
    "withdrawal-method-dropdown"
  );
  const withdrawalMethodSelected = document.getElementById(
    "withdrawal-method-selected"
  );
  const withdrawalMethodOptions = document.querySelectorAll(
    ".withdrawal-method-option"
  );

  const currencyButtonWithdrawal = document.getElementById(
    "currency-button-withdrawal"
  );
  const currencyDropdownWithdrawal = document.getElementById(
    "currency-dropdown-withdrawal"
  );
  const currencySelectedWithdrawal = document.getElementById(
    "currency-selected-withdrawal"
  );
  const currencyOptionsWithdrawal = document.querySelectorAll(
    ".currency-option-withdrawal"
  );
  const currencySearchWithdrawal = document.getElementById(
    "currency-search-withdrawal"
  );

  const networkButtonWithdrawal = document.getElementById(
    "network-button-withdrawal"
  );
  const networkDropdownWithdrawal = document.getElementById(
    "network-dropdown-withdrawal"
  );
  const networkSelectedWithdrawal = document.getElementById(
    "network-selected-withdrawal"
  );
  const networkOptionsWithdrawal = document.querySelectorAll(
    ".network-option-withdrawal"
  );

  // Currency dropdown handlers (CRYPTO PAGE)
  if (currencyButton && currencyDropdown) {
    currencyButton.addEventListener("click", (e) => {
      e.stopPropagation();
      currencyDropdown.classList.toggle("hidden");
      if (networkDropdown) {
        networkDropdown.classList.add("hidden");
      }
    });

    currencyOptions.forEach((option) => {
      option.addEventListener("click", () => {
        currencySelected.textContent = option.dataset.value;
        currencyDropdown.classList.add("hidden");
      });
    });

    if (currencySearch) {
      currencySearch.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        currencyOptions.forEach((option) => {
          const text = option.textContent.toLowerCase();
          option.style.display = text.includes(searchTerm) ? "block" : "none";
        });
      });
    }

    currencyDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Network dropdown handlers (CRYPTO PAGE)
  if (networkButton && networkDropdown) {
    networkButton.addEventListener("click", (e) => {
      e.stopPropagation();
      networkDropdown.classList.toggle("hidden");
      if (currencyDropdown) {
        currencyDropdown.classList.add("hidden");
      }
    });

    networkOptions.forEach((option) => {
      option.addEventListener("click", () => {
        networkSelected.textContent = option.dataset.value;
        networkDropdown.classList.add("hidden");
      });
    });

    networkDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Currency dropdown handlers (BANK PAGE)
  if (currencyButtonBank && currencyDropdownBank) {
    currencyButtonBank.addEventListener("click", (e) => {
      e.stopPropagation();
      currencyDropdownBank.classList.toggle("hidden");
    });

    currencyOptionsBank.forEach((option) => {
      option.addEventListener("click", () => {
        currencySelectedBank.textContent = option.dataset.value;
        currencyDropdownBank.classList.add("hidden");
      });
    });

    if (currencySearchBank) {
      currencySearchBank.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        currencyOptionsBank.forEach((option) => {
          const text = option.textContent.toLowerCase();
          option.style.display = text.includes(searchTerm) ? "block" : "none";
        });
      });
    }

    currencyDropdownBank.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Withdrawal method dropdown (WITHDRAWAL PAGE)
  if (withdrawalMethodButton && withdrawalMethodDropdown) {
    withdrawalMethodButton.addEventListener("click", (e) => {
      e.stopPropagation();
      withdrawalMethodDropdown.classList.toggle("hidden");
      if (currencyDropdownWithdrawal)
        currencyDropdownWithdrawal.classList.add("hidden");
      if (networkDropdownWithdrawal)
        networkDropdownWithdrawal.classList.add("hidden");
    });

    withdrawalMethodOptions.forEach((option) => {
      option.addEventListener("click", () => {
        withdrawalMethodSelected.textContent = option.dataset.value;
        withdrawalMethodDropdown.classList.add("hidden");
      });
    });

    withdrawalMethodDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Currency dropdown handlers (WITHDRAWAL PAGE)
  if (currencyButtonWithdrawal && currencyDropdownWithdrawal) {
    currencyButtonWithdrawal.addEventListener("click", (e) => {
      e.stopPropagation();
      currencyDropdownWithdrawal.classList.toggle("hidden");
      if (withdrawalMethodDropdown)
        withdrawalMethodDropdown.classList.add("hidden");
      if (networkDropdownWithdrawal)
        networkDropdownWithdrawal.classList.add("hidden");
    });

    currencyOptionsWithdrawal.forEach((option) => {
      option.addEventListener("click", () => {
        currencySelectedWithdrawal.textContent = option.dataset.value;
        currencyDropdownWithdrawal.classList.add("hidden");
      });
    });

    if (currencySearchWithdrawal) {
      currencySearchWithdrawal.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        currencyOptionsWithdrawal.forEach((option) => {
          const text = option.textContent.toLowerCase();
          option.style.display = text.includes(searchTerm) ? "block" : "none";
        });
      });
    }

    currencyDropdownWithdrawal.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Network dropdown handlers (WITHDRAWAL PAGE)
  if (networkButtonWithdrawal && networkDropdownWithdrawal) {
    networkButtonWithdrawal.addEventListener("click", (e) => {
      e.stopPropagation();
      networkDropdownWithdrawal.classList.toggle("hidden");
      if (withdrawalMethodDropdown)
        withdrawalMethodDropdown.classList.add("hidden");
      if (currencyDropdownWithdrawal)
        currencyDropdownWithdrawal.classList.add("hidden");
    });

    networkOptionsWithdrawal.forEach((option) => {
      option.addEventListener("click", () => {
        networkSelectedWithdrawal.textContent = option.dataset.value;
        networkDropdownWithdrawal.classList.add("hidden");
      });
    });

    networkDropdownWithdrawal.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Close all dropdowns when clicking outside
  document.addEventListener("click", () => {
    if (currencyDropdown) currencyDropdown.classList.add("hidden");
    if (networkDropdown) networkDropdown.classList.add("hidden");
    if (currencyDropdownBank) currencyDropdownBank.classList.add("hidden");
    if (withdrawalMethodDropdown)
      withdrawalMethodDropdown.classList.add("hidden");
    if (currencyDropdownWithdrawal)
      currencyDropdownWithdrawal.classList.add("hidden");
    if (networkDropdownWithdrawal)
      networkDropdownWithdrawal.classList.add("hidden");
  });
}

// Тултип
function initLevelTooltip() {
  const button = document.getElementById("level-info-button");
  const tooltip = document.getElementById("level-info-tooltip");

  if (button && tooltip) {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      tooltip.classList.toggle("hidden");
    });

    // Закрытие
    document.addEventListener("click", (e) => {
      if (!button.contains(e.target) && !tooltip.contains(e.target)) {
        tooltip.classList.add("hidden");
      }
    });

    // Предотвращение закрытия
    tooltip.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-container", "/src/components/header.html");
  loadComponent(
    "header-logged-container",
    "/src/components/header-logged.html"
  );
  loadComponent("footer-container", "/src/components/footer.html");
  initCustomDropdowns();
  initLevelTooltip();
});

window.toggleTextBlock = toggleTextBlock;
