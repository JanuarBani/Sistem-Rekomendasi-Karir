import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import KarirPage from "../pages/prediksi-karir/prediksi-career";
import JurusanPage from "../pages/prediksi-major/prediksi-jurusan";

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/prediksi-karier": new KarirPage(),
  "/prediksi-jurusan": new JurusanPage(),
};

export default routes;
