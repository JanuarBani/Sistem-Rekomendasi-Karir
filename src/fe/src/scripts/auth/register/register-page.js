import RegisterPresenter from "./register-presenter";
import { registerUser } from "../../data/api";
import * as AuthModel from "../../utils/auth";

export default class RegisterPage {
  #presenter = null;

  async render() {
    // Cegah akses jika sudah login
    if (AuthModel.isLoggedIn && AuthModel.isLoggedIn()) {
      alert("Anda sudah login. Mengarahkan ke beranda...");
      location.hash = "/";
      return "";
    }

    return `
      <section class="container mx-auto py-12 px-4 flex justify-center min-h-screen">
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 class="text-3xl font-semibold mb-8 text-center text-gray-900 dark:text-gray-100">Daftar Akun</h1>

          <form id="register-form" novalidate class="space-y-6">
            <div>
              <label for="name-input" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
              <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <span class="px-3 text-gray-400 dark:text-gray-500"><i class="fas fa-user"></i></span>
                <input
                  id="name-input"
                  type="text"
                  name="name"
                  class="flex-1 py-2 px-3 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                  placeholder="Masukkan nama lengkap Anda"
                  required
                >
              </div>
            </div>

            <div>
              <label for="email-input" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <span class="px-3 text-gray-400 dark:text-gray-500"><i class="fas fa-envelope"></i></span>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  class="flex-1 py-2 px-3 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                  placeholder="Contoh: nama@email.com"
                  required
                >
              </div>
              <p id="email-validation" class="mt-1 text-sm text-red-600 dark:text-red-400 hidden">Email tidak valid</p>
            </div>

            <div>
              <label for="password-input" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <span class="px-3 text-gray-400 dark:text-gray-500"><i class="fas fa-lock"></i></span>
                <input
                  id="password-input"
                  type="password"
                  name="password"
                  class="flex-1 py-2 px-3 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                  placeholder="Masukkan password baru"
                  required
                >
              </div>
              <p id="password-validation" class="mt-1 text-sm text-red-600 dark:text-red-400 hidden">Password harus minimal 8 karakter.</p>
            </div>

            <div id="submit-button-container" class="flex justify-center">
              <button
                type="submit"
                id="submit-button"
                class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-2 rounded flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              >
                <i class="fas fa-user-plus"></i> Daftar Akun
              </button>
            </div>

            <p class="text-center text-gray-600 dark:text-gray-400">
              Sudah punya akun? <a href="#/login" class="text-blue-600 dark:text-blue-400 hover:underline">Masuk</a>
            </p>
          </form>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      registerUser,
    });

    this.#setupForm();
  }

  #setupForm() {
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
    const submitButton = document.getElementById("submit-button");
    const emailValidation = document.getElementById("email-validation");
    const passwordValidation = document.getElementById("password-validation");

    emailInput.addEventListener("input", () => {
      this.#validateEmail(emailInput.value);
      this.#toggleSubmitButton();
    });

    passwordInput.addEventListener("input", () => {
      this.#validatePassword(passwordInput.value);
      this.#toggleSubmitButton();
    });

    document
      .getElementById("register-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name-input").value;
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!name || !email || !password) {
          alert("Semua field harus diisi.");
          return;
        }

        const data = { name, email, password };
        await this.#presenter.getRegistered(data);
      });
  }

  #validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidation = document.getElementById("email-validation");

    if (emailPattern.test(email)) {
      emailValidation.classList.add("hidden");
    } else {
      emailValidation.classList.remove("hidden");
    }
  }

  #validatePassword(password) {
    const passwordValidation = document.getElementById("password-validation");

    if (password.length < 8) {
      passwordValidation.classList.remove("hidden");
    } else {
      passwordValidation.classList.add("hidden");
    }
  }

  #toggleSubmitButton() {
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
    const submitButton = document.getElementById("submit-button");

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    const isPasswordValid = passwordInput.value.length >= 8;

    submitButton.disabled = !(isEmailValid && isPasswordValid);
  }

  registeredSuccessfully(message) {
    alert(message || "Registrasi berhasil!");
    location.hash = "/login";
  }

  registeredFailed(message) {
    alert(message || "Registrasi gagal.");
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="w-full bg-gray-400 cursor-not-allowed py-2 rounded flex items-center justify-center gap-2" type="submit" disabled>
        <i class="fas fa-spinner fa-spin"></i> Daftar akun
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button
        type="submit"
        id="submit-button"
        class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-2 rounded flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled
      >
        <i class="fas fa-user-plus"></i> Daftar Akun
      </button>
    `;
  }
}
