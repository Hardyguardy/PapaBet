import "./index.css";

// Header footer load
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;

    // Инициализируем поиск после загрузки хедера
    if (elementId === "header-logged-container") {
      setTimeout(() => {
        initSearch();
      }, 100);
    }
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}

// Функция инициализации поиска
function initSearch() {
  const searchButton = document.getElementById("search-button");
  const searchDropdown = document.getElementById("search-dropdown");
  const searchInput = document.getElementById("search-input");

  console.log("initSearch called", {
    searchButton,
    searchDropdown,
    searchInput,
  });

  if (searchButton && searchDropdown && searchInput) {
    searchButton.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Search button clicked");
      searchDropdown.classList.toggle("hidden");
      if (!searchDropdown.classList.contains("hidden")) {
        searchInput.focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (
        !searchButton.contains(e.target) &&
        !searchDropdown.contains(e.target)
      ) {
        searchDropdown.classList.add("hidden");
      }
    });

    searchDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  } else {
    console.error("Search elements not found!");
  }
}

// Функция для Show More
function toggleTextBlock(button) {
  const container = button.closest(".relative").parentElement;
  const textContent = container.querySelector(".text-content");
  const gradientOverlay = container.querySelector(".gradient-overlay");

  const isExpanded = textContent.style.maxHeight !== "100px";

  if (isExpanded) {
    textContent.style.maxHeight = "100px";
    gradientOverlay.style.opacity = "1";
    button.textContent = "Show more";
  } else {
    textContent.style.maxHeight = textContent.scrollHeight + "px";
    gradientOverlay.style.opacity = "0";
    button.textContent = "Show less";
  }
}

// Открытие тултипа пароля
function initPasswordToggle() {
  const togglePassword = document.getElementById("toggle-password");
  const passwordInput = document.getElementById("password-input");
  const passwordTooltip = document.getElementById("password-tooltip");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
    });
  }

  if (passwordInput && passwordTooltip) {
    passwordInput.addEventListener("focus", () => {
      passwordTooltip.classList.remove("hidden");
    });

    passwordInput.addEventListener("blur", () => {
      setTimeout(() => {
        passwordTooltip.classList.add("hidden");
      }, 200);
    });
  }
}

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

  console.log("Elements found:", {
    currencyButton,
    networkButton,
    currencyButtonBank,
    withdrawalMethodButton,
  });

  // Currency dropdown handlers (CRYPTO PAGE)
  if (currencyButton && currencyDropdown) {
    currencyButton.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Currency button clicked");
      currencyDropdown.classList.toggle("hidden");
      if (networkDropdown) networkDropdown.classList.add("hidden");
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
      console.log("Network button clicked");
      networkDropdown.classList.toggle("hidden");
      if (currencyDropdown) currencyDropdown.classList.add("hidden");
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
      console.log("Bank currency button clicked");
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
      console.log("Withdrawal method button clicked");
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
      console.log("Withdrawal currency button clicked");
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
      console.log("Withdrawal network button clicked");
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

// Тултип уровня
function initLevelTooltip() {
  const button = document.getElementById("level-info-button");
  const tooltip = document.getElementById("level-info-tooltip");

  if (button && tooltip) {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      tooltip.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!button.contains(e.target) && !tooltip.contains(e.target)) {
        tooltip.classList.add("hidden");
      }
    });

    tooltip.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
}

// Мобильное меню
// Мобильное меню (полноэкранное)
function initMobileMenu() {
  console.log("initMobileMenu called");

  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const menuIconBurger = document.getElementById("menu-icon-burger");
  const menuIconClose = document.getElementById("menu-icon-close");

  console.log("Mobile menu elements:", {
    mobileMenuButton,
    mobileMenu,
    mobileMenuClose,
  });

  if (mobileMenuButton && mobileMenu) {
    let isOpen = false;

    // Открытие меню по клику на бургер
    mobileMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Mobile menu button clicked");

      if (!isOpen) {
        // Открыть меню
        mobileMenu.classList.remove("translate-x-full");
        mobileMenu.classList.add("translate-x-0");
        if (menuIconBurger) {
          menuIconBurger.classList.remove("opacity-100");
          menuIconBurger.classList.add("opacity-0");
        }
        if (menuIconClose) {
          menuIconClose.classList.remove("opacity-0");
          menuIconClose.classList.add("opacity-100");
        }
        document.body.style.overflow = "hidden";
        isOpen = true;
        console.log("Menu opened");
      }
    });

    // Закрытие меню по клику на крестик
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("Close button clicked");

        // Закрыть меню
        mobileMenu.classList.remove("translate-x-0");
        mobileMenu.classList.add("translate-x-full");
        if (menuIconBurger) {
          menuIconBurger.classList.remove("opacity-0");
          menuIconBurger.classList.add("opacity-100");
        }
        if (menuIconClose) {
          menuIconClose.classList.remove("opacity-100");
          menuIconClose.classList.add("opacity-0");
        }
        document.body.style.overflow = "";
        isOpen = false;
        console.log("Menu closed");
      });
    }

    // Закрытие при клике на ссылку в меню
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-0");
        mobileMenu.classList.add("translate-x-full");
        if (menuIconBurger) {
          menuIconBurger.classList.remove("opacity-0");
          menuIconBurger.classList.add("opacity-100");
        }
        if (menuIconClose) {
          menuIconClose.classList.remove("opacity-100");
          menuIconClose.classList.add("opacity-0");
        }
        document.body.style.overflow = "";
        isOpen = false;
      });
    });
  } else {
    console.error("Mobile menu elements not found!");
  }
}

// Мобильный сайдбар (переключение между ИГРЫ и СЕРВИСЫ)
function initMobileSidebar() {
  const gamesButton = document.getElementById("mobile-games-button");
  const servicesButton = document.getElementById("mobile-services-button");
  const toggleButton = document.getElementById("mobile-toggle-button");
  const gamesMenu = document.getElementById("mobile-games-menu");
  const servicesMenu = document.getElementById("mobile-services-menu");
  const arrowIcon = document.getElementById("arrow-icon");

  if (
    gamesButton &&
    servicesButton &&
    toggleButton &&
    gamesMenu &&
    servicesMenu &&
    arrowIcon
  ) {
    let currentMenu = null; // null, 'games', или 'services'

    // Клик на ИГРЫ
    gamesButton.addEventListener("click", () => {
      if (currentMenu === "games") {
        // Закрыть если уже открыто
        gamesMenu.classList.add("hidden");
        currentMenu = null;
        arrowIcon.style.transform = "rotate(0deg)";
      } else {
        // Открыть ИГРЫ, закрыть СЕРВИСЫ
        gamesMenu.classList.remove("hidden");
        servicesMenu.classList.add("hidden");
        currentMenu = "games";
        arrowIcon.style.transform = "rotate(90deg)";

        // Обновить стили кнопок
        gamesButton.querySelector("span").classList.remove("text-gray-400");
        gamesButton.querySelector("span").classList.add("text-brand-secondary");
        servicesButton
          .querySelector("span")
          .classList.remove("text-brand-secondary");
        servicesButton.querySelector("span").classList.add("text-gray-400");
      }
    });

    // Клик на СЕРВИСЫ
    servicesButton.addEventListener("click", () => {
      if (currentMenu === "services") {
        // Закрыть если уже открыто
        servicesMenu.classList.add("hidden");
        currentMenu = null;
        arrowIcon.style.transform = "rotate(0deg)";
      } else {
        // Открыть СЕРВИСЫ, закрыть ИГРЫ
        servicesMenu.classList.remove("hidden");
        gamesMenu.classList.add("hidden");
        currentMenu = "services";
        arrowIcon.style.transform = "rotate(90deg)";

        // Обновить стили кнопок
        servicesButton.querySelector("span").classList.remove("text-gray-400");
        servicesButton
          .querySelector("span")
          .classList.add("text-brand-secondary");
        gamesButton
          .querySelector("span")
          .classList.remove("text-brand-secondary");
        gamesButton.querySelector("span").classList.add("text-gray-400");
      }
    });

    // Клик на стрелку - закрывает любое открытое меню
    toggleButton.addEventListener("click", () => {
      if (currentMenu) {
        gamesMenu.classList.add("hidden");
        servicesMenu.classList.add("hidden");
        currentMenu = null;
        arrowIcon.style.transform = "rotate(0deg)";
      }
    });
  }
}

// Мобильное меню для залогиненного хедера
function initMobileMenuLogged() {
  const mobileMenuButton = document.getElementById("mobile-menu-button-logged");
  const mobileMenu = document.getElementById("mobile-menu-logged");
  const mobileMenuClose = document.getElementById("mobile-menu-close-logged");
  const menuIconBurger = document.getElementById("menu-icon-burger-logged");
  const menuIconClose = document.getElementById("menu-icon-close-logged");

  if (mobileMenuButton && mobileMenu) {
    let isOpen = false;

    mobileMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!isOpen) {
        mobileMenu.classList.remove("-translate-y-full");
        mobileMenu.classList.add("translate-y-0");
        if (menuIconBurger) menuIconBurger.classList.add("opacity-0");
        if (menuIconClose) menuIconClose.classList.add("opacity-100");
        document.body.style.overflow = "hidden";
        isOpen = true;
      }
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileMenu.classList.remove("translate-y-0");
        mobileMenu.classList.add("-translate-y-full");
        if (menuIconBurger) menuIconBurger.classList.remove("opacity-0");
        if (menuIconClose) menuIconClose.classList.remove("opacity-100");
        document.body.style.overflow = "";
        isOpen = false;
      });
    }

    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-y-0");
        mobileMenu.classList.add("-translate-y-full");
        if (menuIconBurger) menuIconBurger.classList.remove("opacity-0");
        if (menuIconClose) menuIconClose.classList.remove("opacity-100");
        document.body.style.overflow = "";
        isOpen = false;
      });
    });
  }
}

// Десктопный поиск для залогиненного хедера
function initSearchDropdownLogged() {
  const searchButton = document.getElementById("search-button-logged");
  const searchDropdown = document.getElementById("search-dropdown-logged");

  if (searchButton && searchDropdown) {
    searchButton.addEventListener("click", (e) => {
      e.stopPropagation();
      searchDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (
        !searchDropdown.contains(e.target) &&
        !searchButton.contains(e.target)
      ) {
        searchDropdown.classList.add("hidden");
      }
    });
  }
}

// Transaction History Page
function initTransactionHistoryButtons() {
  const mobileProfileNavButton = document.getElementById(
    "mobile-profile-nav-button-tx"
  );
  const mobileProfileNavDropdown = document.getElementById(
    "mobile-profile-nav-dropdown-tx"
  );

  if (mobileProfileNavButton && mobileProfileNavDropdown) {
    mobileProfileNavButton.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileProfileNavDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (
        !mobileProfileNavDropdown.contains(e.target) &&
        !mobileProfileNavButton.contains(e.target)
      ) {
        mobileProfileNavDropdown.classList.add("hidden");
      }
    });
  }

  // Deposits/Withdrawals Toggle
  const depositsButton = document.getElementById("deposits-button");
  const withdrawalsButton = document.getElementById("withdrawals-button");

  if (depositsButton && withdrawalsButton) {
    depositsButton.addEventListener("click", () => {
      depositsButton.classList.remove("bg-white/10", "text-white");
      depositsButton.classList.add("bg-[#cddc39]", "text-black");
      withdrawalsButton.classList.remove("bg-[#cddc39]", "text-black");
      withdrawalsButton.classList.add("bg-white/10", "text-white");
    });

    withdrawalsButton.addEventListener("click", () => {
      withdrawalsButton.classList.remove("bg-white/10", "text-white");
      withdrawalsButton.classList.add("bg-[#cddc39]", "text-black");
      depositsButton.classList.remove("bg-[#cddc39]", "text-black");
      depositsButton.classList.add("bg-white/10", "text-white");
    });
  }
}

function initBetHistoryDropdowns() {
  console.log("initBetHistoryDropdowns called");

  const mobileProfileNavButton = document.getElementById(
    "mobile-profile-nav-button"
  );
  const mobileProfileNavDropdown = document.getElementById(
    "mobile-profile-nav-dropdown"
  );

  console.log("Elements found:", {
    mobileProfileNavButton,
    mobileProfileNavDropdown,
  });

  if (mobileProfileNavButton && mobileProfileNavDropdown) {
    mobileProfileNavButton.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Mobile profile nav clicked");
      mobileProfileNavDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (
        !mobileProfileNavDropdown.contains(e.target) &&
        !mobileProfileNavButton.contains(e.target)
      ) {
        mobileProfileNavDropdown.classList.add("hidden");
      }
    });
  }

  // Period Dropdown
  const periodButton = document.getElementById("period-button");
  const periodDropdown = document.getElementById("period-dropdown");
  const periodSelected = document.getElementById("period-selected");
  const periodOptions = document.querySelectorAll(".period-option");

  console.log("Period elements:", { periodButton, periodDropdown });

  if (periodButton && periodDropdown) {
    periodButton.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Period button clicked");
      periodDropdown.classList.toggle("hidden");
      const gameDropdown = document.getElementById("game-dropdown");
      if (gameDropdown) gameDropdown.classList.add("hidden");
    });

    periodOptions.forEach((option) => {
      option.addEventListener("click", () => {
        console.log("Period option clicked:", option.dataset.value);
        periodSelected.textContent = option.dataset.value;
        periodDropdown.classList.add("hidden");
      });
    });
  }

  // Game Dropdown
  const gameButton = document.getElementById("game-button");
  const gameDropdown = document.getElementById("game-dropdown");
  const gameSelected = document.getElementById("game-selected");
  const gameOptions = document.querySelectorAll(".game-option");

  console.log("Game elements:", { gameButton, gameDropdown });

  if (gameButton && gameDropdown) {
    gameButton.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Game button clicked");
      gameDropdown.classList.toggle("hidden");
      const periodDropdown = document.getElementById("period-dropdown");
      if (periodDropdown) periodDropdown.classList.add("hidden");
    });

    gameOptions.forEach((option) => {
      option.addEventListener("click", () => {
        console.log("Game option clicked:", option.dataset.value);
        gameSelected.textContent = option.dataset.value;
        gameDropdown.classList.add("hidden");
      });
    });
  }

  // Close dropdowns on outside click
  document.addEventListener("click", () => {
    if (periodDropdown) periodDropdown.classList.add("hidden");
    if (gameDropdown) gameDropdown.classList.add("hidden");
  });
}

function initStatsPage() {
  const mobileProfileNavButton = document.getElementById(
    "mobile-profile-nav-button-stats"
  );
  const mobileProfileNavDropdown = document.getElementById(
    "mobile-profile-nav-dropdown-stats"
  );

  if (mobileProfileNavButton && mobileProfileNavDropdown) {
    mobileProfileNavButton.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileProfileNavDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (
        !mobileProfileNavDropdown.contains(e.target) &&
        !mobileProfileNavButton.contains(e.target)
      ) {
        mobileProfileNavDropdown.classList.add("hidden");
      }
    });
  }
}

function initChartPeriodSwitcher() {
  const btn7days = document.getElementById("chart-period-7days");
  const btn30days = document.getElementById("chart-period-30days");
  const btn90days = document.getElementById("chart-period-90days");

  const chart7days = document.getElementById("chart-7days");
  const chart30days = document.getElementById("chart-30days");
  const chart90days = document.getElementById("chart-90days");

  const dateStart = document.getElementById("chart-date-start");
  const dateEnd = document.getElementById("chart-date-end");

  if (!btn7days || !btn30days || !btn90days) return;

  function setActiveButton(activeBtn) {
    [btn7days, btn30days, btn90days].forEach((btn) => {
      btn.classList.remove("bg-[#cddc39]", "text-black");
      btn.classList.add("bg-white/10", "text-gray-400");
    });
    activeBtn.classList.remove("bg-white/10", "text-gray-400");
    activeBtn.classList.add("bg-[#cddc39]", "text-black");
  }

  function showChart(chart) {
    [chart7days, chart30days, chart90days].forEach((c) =>
      c?.classList.add("hidden")
    );
    chart?.classList.remove("hidden");
  }

  btn7days?.addEventListener("click", () => {
    setActiveButton(btn7days);
    showChart(chart7days);
    dateStart.textContent = "АВГУСТ 9, 2025";
    dateEnd.textContent = "АВГУСТ 15, 2025";
  });

  btn30days?.addEventListener("click", () => {
    setActiveButton(btn30days);
    showChart(chart30days);
    dateStart.textContent = "АВГУСТ 15, 2025";
    dateEnd.textContent = "СЕНТЯБРЯ 15, 2025";
  });

  btn90days?.addEventListener("click", () => {
    setActiveButton(btn90days);
    showChart(chart90days);
    dateStart.textContent = "ИЮНЬ 15, 2025";
    dateEnd.textContent = "СЕНТЯБРЯ 15, 2025";
  });
}

// ГЛАВНАЯ ИНИЦИАЛИЗАЦИЯ
document.addEventListener("DOMContentLoaded", () => {
  // Загрузка компонентов
  loadComponent("header-container", "/src/components/header.html");
  loadComponent(
    "header-logged-container",
    "/src/components/header-logged.html"
  );
  loadComponent("footer-container", "/src/components/footer.html");

  // Инициализация с задержкой для элементов страницы
  setTimeout(() => {
    initCustomDropdowns();
    initLevelTooltip();
    initPasswordToggle();
    initMobileMenu();
    initMobileSidebar();
    initMobileMenuLogged();
    initSearchDropdownLogged();
    initBetHistoryDropdowns();
    initStatsPage();
    initChartPeriodSwitcher();
  }, 100);
});

// Экспорт функции для глобального использования
window.toggleTextBlock = toggleTextBlock;
