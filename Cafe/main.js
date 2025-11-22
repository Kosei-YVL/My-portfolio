//main.js
// main.js

// DOM の読み込み完了後に実行
document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // 共通スライダー初期化関数
  // =========================
  function initSlider(rootElement) {
    const track = rootElement.querySelector(".slider-track");
    const slides = Array.from(track.children);
    const prevBtn = rootElement.querySelector(".slider-arrow.prev");
    const nextBtn = rootElement.querySelector(".slider-arrow.next");
    const dotsContainer = rootElement.querySelector(".slider-dots");

    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    // ドット生成
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // スライド移動
    function goToSlide(index) {
      // 範囲チェック（無限ループなし）
      if (index < 0) index = 0;
      if (index > slides.length - 1) index = slides.length - 1;

      const offset = -index * 100; // 1枚ずつ全幅
      track.style.transform = `translateX(${offset}%)`;
      currentIndex = index;

      // ドットの状態更新
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });

      // 端でボタンを無効化（必要な場合）
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
      }
      if (nextBtn) {
        nextBtn.disabled = currentIndex === slides.length - 1;
      }
    }

    // ボタンイベント
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
      });
    }

    // 初期表示
    goToSlide(0);
  }

  // 画像スライダー初期化
  const topSlider = document.getElementById("top-slider");
  if (topSlider) {
    initSlider(topSlider);
  }

  // NEWS スライダー初期化
  const newsSlider = document.getElementById("news-slider");
  if (newsSlider) {
    initSlider(newsSlider);
  }

  // =========================
  // ハンバーガーメニュー
  // =========================
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  function openMenu() {
    if (!mobileMenu || !overlay || !hamburger) return;
    mobileMenu.classList.add("open");
    overlay.classList.add("open");
    hamburger.classList.add("is-active");
    mobileMenu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    if (!mobileMenu || !overlay || !hamburger) return;
    mobileMenu.classList.remove("open");
    overlay.classList.remove("open");
    hamburger.classList.remove("is-active");
    mobileMenu.setAttribute("aria-hidden", "true");
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      closeMenu();
    });
  }

  // メニュー内リンクを押したら閉じる
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // ESCキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
});
