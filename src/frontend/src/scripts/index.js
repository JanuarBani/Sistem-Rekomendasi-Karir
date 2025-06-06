// CSS imports
import '../styles/styles.css';

import App from './pages/app';
import { registerSW } from 'virtual:pwa-register';

/**
 * Terapkan preferensi tema dari localStorage atau sistem
 */
function applyThemeFromPreference() {
  const root = document.documentElement;

  const userPref = localStorage.getItem('theme');
  const systemPrefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (userPref === 'dark' || (!userPref && systemPrefDark)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Setup tombol toggle dark mode untuk semua tombol yang punya ID dimulai dengan "theme-toggle"
 */
function setupThemeToggle() {
  const buttons = document.querySelectorAll('[id^="theme-toggle"]');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const root = document.documentElement;
      const isDark = root.classList.contains('dark');

      // Toggle dan simpan preferensi
      root.classList.toggle('dark', !isDark);
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  });
}

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Update tersedia. Reload sekarang?')) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log('Aplikasi siap digunakan offline');
  },
});

/**
 * Inisialisasi utama aplikasi
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Terapkan tema awal
  applyThemeFromPreference();

  // Siapkan toggle dark mode
  setupThemeToggle();

  // Inisialisasi app
  const app = new App();
  await app.init();
});
