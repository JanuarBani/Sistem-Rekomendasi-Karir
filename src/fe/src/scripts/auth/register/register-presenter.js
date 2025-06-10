export default class RegisterPresenter {
  #view;
  #registerUser;

  constructor({ view, registerUser }) {
    this.#view = view;
    this.#registerUser = registerUser;
  }

  async getRegistered({ name, email, password }) {
    this.#view.showSubmitLoadingButton();

    try {
      const response = await this.#registerUser(name, email, password);

      if (response.error) {
        console.error("getRegistered: error response:", response);
        this.#view.registeredSuccessfully(response.message);
      }

      this.#view.registeredSuccessfully(response.message);
    } catch (error) {
      console.error("getRegistered: error:", error);

      let errorMessage = error.message || "Terjadi kesalahan yang tidak diketahui.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      this.#view.registeredFailed(errorMessage);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
