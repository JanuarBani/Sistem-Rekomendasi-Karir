import LoginPresenter from "./login-presenter";
import * as STORYAPI from "../../data/api";
import * as AuthModel from "../../utils/auth";

export default class LoginPage {
  #presenter = null;

  async render() {
    if (AuthModel.isLoggedIn && AuthModel.isLoggedIn()) {
      alert("Anda sudah login. Mengarahkan ke beranda...");
      location.hash = "/";
      return "";
    }

    return `
      <section class="container mx-auto flex justify-center items-center min-h-screen px-4 bg-white dark:bg-gray-900">
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 class="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">Masuk Akun</h2>
          <form id="login-form" class="space-y-6">
            <div>
              <label for="email-input" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <span class="px-3 text-gray-400 dark:text-gray-500"><i class="fas fa-envelope"></i></span>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  class="flex-1 py-2 px-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none"
                  placeholder="Contoh: nama@email.com"
                  required
                >
              </div>
            </div>

            <div>
              <label for="password-input" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <span class="px-3 text-gray-400 dark:text-gray-500"><i class="fas fa-lock"></i></span>
                <input
                  id="password-input"
                  type="password"
                  name="password"
                  class="flex-1 py-2 px-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none"
                  placeholder="Masukkan password Anda"
                  required
                >
              </div>
            </div>

            <div id="submit-button-container" class="flex justify-center">
              <button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-2 rounded flex items-center justify-center gap-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <i class="fas fa-sign-in-alt"></i> Masuk
              </button>
            </div>

            <p class="text-center text-sm text-gray-600 dark:text-gray-400">
              Belum punya akun?
              <a href="#/register" class="text-blue-600 dark:text-blue-400 hover:underline">Daftar</a>
            </p>
          </form>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: STORYAPI,
      authModel: AuthModel,
    });

    this.#setupForm();
  }

  #setupForm() {
    document
      .getElementById("login-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email-input").value;
        const password = document.getElementById("password-input").value;

        this.#presenter.getLogin({ email, password });
      });
  }

  loginFailed(message) {
    alert(message || "Login gagal. Cek email atau password Anda.");
  }

  loginSuccessfully(message, loginResult) {
    alert(message || "Login berhasil!");
    location.hash = "/";
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="w-full bg-gray-400 cursor-not-allowed py-2 rounded flex items-center justify-center gap-2" type="submit" disabled>
        <i class="fas fa-spinner fa-spin"></i> Masuk
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-2 rounded flex items-center justify-center gap-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <i class="fas fa-sign-in-alt"></i> Masuk
      </button>
    `;
  }
}
