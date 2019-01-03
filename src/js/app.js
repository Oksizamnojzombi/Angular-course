// Libs
import 'jquery';
import 'bootstrap';
import 'popper.js';
// Styles
import './../css/style.css';
// Guard
import { AuthGuard } from './guard/auth.guard';
// Pages
import { LoginPage } from './controls/login';
import { HomePage } from './controls/home';
import { RegistrationPage } from './controls/register';

const guard = new AuthGuard();

const path = window.location.pathname;
const page = path.split('/').pop().slice(0, -5);

switch(page) {
    case 'login':
        guard.check(page);
        LoginPage();
        break;
    case 'index':
        guard.check(page);
        HomePage();
        break;
    case 'register':
        guard.check(page);
        RegistrationPage();
        break;
}