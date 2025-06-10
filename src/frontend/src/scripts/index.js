// Import CSS utama
import "../styles/styles.css";

// Import App class dan service worker register
import App from "./pages/app";
import { registerSW } from "virtual:pwa-register";

/**
 * Terapkan preferensi tema dari localStorage atau sistem
 */
function applyThemeFromPreference() {
  const root = document.documentElement;
  const icon = document.getElementById("theme-icon");

  const userPref = localStorage.getItem("theme");
  const systemPrefLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  // Balik: sekarang "light" dianggap preferensi utama
  const isLight = userPref === "light" || (!userPref && systemPrefLight);

  // Gunakan mode terang jika `isLight` true
  root.classList.toggle("light", isLight);
  root.classList.toggle("dark", !isLight);

  if (icon) {
    // Ganti ikon sesuai: jika terang, pakai bulan (untuk toggle ke dark)
    icon.classList.replace(
      isLight ? "fa-sun" : "fa-moon",
      isLight ? "fa-moon" : "fa-sun"
    );
  }
}

function setupThemeToggle() {
  const buttons = document.querySelectorAll('[id^="theme-toggle"]');
  const icon = document.getElementById("theme-icon");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const root = document.documentElement;
      const isLight = root.classList.contains("light");

      // Toggle ke dark jika sekarang light, dan sebaliknya
      root.classList.toggle("light", !isLight);
      root.classList.toggle("dark", isLight);

      localStorage.setItem("theme", isLight ? "dark" : "light");

      if (icon) {
        icon.classList.replace(
          isLight ? "fa-moon" : "fa-sun",
          isLight ? "fa-sun" : "fa-moon"
        );
      }
    });
  });
}

/**
 * Tandai link navigasi aktif berdasarkan hash URL
 */
function highlightActiveNavLink() {
  const links = document.querySelectorAll("nav a");
  const currentHash = window.location.hash || "#/";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === currentHash;

    link.classList.toggle("font-semibold", isActive);
    link.classList.toggle("underline", isActive);
    link.classList.toggle("underline-offset-4", isActive);
    link.classList.toggle("text-blue-800", isActive);
    link.classList.toggle("dark:text-blue-300", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
      link.classList.remove("text-blue-600", "dark:text-white");
    } else {
      link.removeAttribute("aria-current");
      link.classList.remove(
        "font-semibold",
        "underline",
        "underline-offset-4",
        "text-blue-800",
        "dark:text-blue-300"
      );
      link.classList.add("text-blue-600", "dark:text-white");
    }
  });
}

function setupDrawerToggle() {
  const drawerButton = document.getElementById("drawer-button");
  const nav = document.getElementById("navbar-default");

  if (!drawerButton || !nav) return;

  drawerButton.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
}

function closeDrawerOnLinkClick() {
  const navLinks = document.querySelectorAll("#navbar-default a");
  const nav = document.getElementById("navbar-default");

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      if (window.innerWidth < 1024) {
        nav.classList.add("hidden");
      }
    })
  );
}

/**
 * Register service worker dengan opsi reload otomatis
 */
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Update tersedia. Reload sekarang?")) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log("Aplikasi siap digunakan offline");
  },
});

/**
 * Inisialisasi utama saat DOM sudah siap
 */
document.addEventListener("DOMContentLoaded", async () => {
  // Terapkan tema dari preferensi
  applyThemeFromPreference();

  // Setup tombol tema
  setupThemeToggle();

  // setupDrawerToggle();
  closeDrawerOnLinkClick();

  // Tandai link navigasi aktif
  highlightActiveNavLink();

  // Update saat hash berubah
  window.addEventListener("hashchange", highlightActiveNavLink);

  // Inisialisasi App
  const app = new App();
  await app.init();
});

// Jalankan saat halaman load
window.addEventListener("load", highlightActiveNavLink);
