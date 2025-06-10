// CSS imports
import '../styles/styles.css';

import App from './pages/app';
import { registerServiceWorker } from './utils';
import { generateNavLinksTemplate } from './templates';

document.addEventListener('DOMContentLoaded', async () => {
  // Render navbar links
  const authNavbar = document.getElementById('auth-navbar');
  const mainNavbar = document.getElementById('main-navbar');
  const mobileLinks = document.getElementById('mobile-links');

  if (mobileLinks) mobileLinks.innerHTML = generateNavLinksTemplate(true);
  if (mainNavbar) mainNavbar.innerHTML = generateNavLinksTemplate(false);

  // Handle skip link and main content
  const content = document.querySelector('#main-content');
  const skipLinkButton = document.getElementById('skip-link');
  if (!content || !skipLinkButton) {
    if (!content) console.error("Elemen 'main-content' tidak ditemukan di DOM.");
    if (!skipLinkButton) console.error("Elemen 'skip-link' tidak ditemukan di DOM.");
    return;
  }

  // Handle drawer toggle
  const drawerButton = document.getElementById('drawer-button');
  const drawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerCloseAuth = document.getElementById('drawer-close-auth');
  const drawerOverlay = document.getElementById('drawer-overlay');

  function closeDrawer() {
    drawer?.classList.add('-translate-x-full');
    authNavbar?.classList.add('-translate-x-full');
    drawerOverlay?.classList.add('hidden');
  }

  drawerButton?.addEventListener('click', () => {
    if (location.hash === '#/login' || location.hash === '#/register') {
      authNavbar?.classList.remove('-translate-x-full');
    } else {
      drawer?.classList.remove('-translate-x-full');
    }
    drawerOverlay?.classList.remove('hidden');
  });

  drawerClose?.addEventListener('click', closeDrawer);
  drawerCloseAuth?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  // Handle theme toggle with icons
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  function setThemeIcons(isDark) {
    if (!iconSun || !iconMoon) return;
    if (isDark) {
      iconSun.classList.remove('hidden');
      iconMoon.classList.add('hidden');
    } else {
      iconSun.classList.add('hidden');
      iconMoon.classList.remove('hidden');
    }
  }

  // Apply saved theme and icon state
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    setThemeIcons(true);
  } else {
    document.documentElement.classList.remove('dark');
    setThemeIcons(false);
  }

  themeToggle?.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setThemeIcons(isDark);
  });

  // Toggle visibility of navbars based on route
  function toggleNavbar() {
    if (!mainNavbar || !authNavbar) return;
    if (location.hash === '#/login' || location.hash === '#/register') {
      mainNavbar.style.display = 'none';
      authNavbar.style.display = 'flex';
    } else {
      mainNavbar.style.display = 'flex';
      authNavbar.style.display = 'none';
    }
  }

  // Inisialisasi App
  const app = new App({ content, skipLinkButton });

  await registerServiceWorker();
  await app.renderPage();
  toggleNavbar();

  // Handle hashchange
  window.addEventListener('hashchange', async () => {
    await app.renderPage();
    toggleNavbar();
  });

  // Sticky header scroll effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }
});
