import CareerModel from "../../../models/CareerModel.js";
import MajorModel from "../../../models/MajorModel.js";

export default class HomePresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async init() {
    await this.loadCareer();
  }

  async loadCareer() {
    try {
      this.#view.showLoading();
      const data = await CareerModel.getTrendingCareersByIndustry();
      this.#view.populateCareerList(data);
    } catch (error) {
      console.error("loadCareer error:", error);
      this.#view.populateMajorListError("Gagal memuat daftar karier.");
    } finally {
      this.#view.hideLoading();
    }
  }

  async loadMajor() {
    try {
      this.#view.showLoading();
      const data = await MajorModel.getMajors();
      this.#view.populateMajorList(data);
    } catch (error) {
      console.error("loadMajor error:", error);
      this.#view.populateMajorListError("Gagal memuat daftar jurusan.");
    } finally {
      this.#view.hideLoading();
    }
  }
}

