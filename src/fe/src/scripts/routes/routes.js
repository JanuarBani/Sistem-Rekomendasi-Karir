import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import RegisterPage from '../auth/register/register-page';
import LoginPage from '../auth/login/login-page';
import NotFoundPage from '../pages/not-found/not-found-page';
import KarirPage from '../pages/prediksi-karir/prediksi-career';
import JurusanPage from '../pages/prediksi-major/prediksi-jurusan';

import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';

const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/': () => checkAuthenticatedRoute(new HomePage()),
  '/about': () => checkAuthenticatedRoute(new AboutPage()),
  '/karier': () => checkAuthenticatedRoute(new KarirPage()),
  '/jurusan': () => checkAuthenticatedRoute(new JurusanPage()),
  '*': () => new NotFoundPage(),
};

export default routes;
