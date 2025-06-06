import routes from '../routes/routes.js';
import UrlParser from '../routes/url-parser.js';

class App {
  constructor() {
    this._content = document.querySelector('#main-content');
    this._drawerButton = document.querySelector('#drawer-button');
    this._navigationDrawer = document.querySelector('#navbar-default');
    this._initialLoad = true;
  }

  async init() {
    this._initializeDrawer();
    await this.renderPage();
    this._initialLoad = false;

    // Render ulang saat hash berubah
    window.addEventListener('hashchange', async () => {
      await this.renderPage();
    });

    // Setup offline detection
    this._setupOfflineDetection();
  }

  _initializeDrawer() {
    this._drawerButton.addEventListener('click', (event) => {
      this._toggleDrawer();
      event.stopPropagation();
    });

    // Tutup drawer saat klik di luar
    document.addEventListener('click', (event) => {
      if (!this._navigationDrawer.contains(event.target) && 
          !this._drawerButton.contains(event.target)) {
        this._navigationDrawer.classList.add('hidden');
      }
    });

    // Tutup drawer saat resize ke desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        this._navigationDrawer.classList.remove('hidden');
      }
    });
  }

  _toggleDrawer() {
    this._navigationDrawer.classList.toggle('hidden');
  }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url] || routes['/'];
      
      this._content.innerHTML = await page.render();
      await page.afterRender?.();

      // Scroll ke atas pada navigasi
      if (!this._initialLoad) {
        window.scrollTo(0, 0);
      }

      // Update active state di navigasi
      this._updateActiveNavigation(url);
    } catch (error) {
      console.error('Error rendering page:', error);
      this._content.innerHTML = `
        <div class="flex items-center justify-center min-h-screen">
          <div class="text-center">
            <h2 class="text-2xl font-bold text-red-600 mb-4">Oops! Terjadi kesalahan</h2>
            <p class="text-gray-600">Silakan coba muat ulang halaman</p>
          </div>
        </div>
      `;
    }
  }

  _updateActiveNavigation(url) {
    const links = document.querySelectorAll('nav a');
    links.forEach((link) => {
      const linkUrl = link.getAttribute('href').substring(1); // Remove #
      if (linkUrl === url) {
        link.classList.add('text-blue-300');
      } else {
        link.classList.remove('text-blue-300');
      }
    });
  }

  _setupOfflineDetection() {
    const offlineNotification = document.getElementById('offline-notification');

    window.addEventListener('online', () => {
      offlineNotification.classList.add('hidden');
    });

    window.addEventListener('offline', () => {
      offlineNotification.classList.remove('hidden');
    });
  }
}

export default App;
