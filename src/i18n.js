import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
en: {
translation: {
    "bienvenida": "Welcome to my app",
    "usuario": "User: {{nombre}}",
    "contador_texto":"Counter:{{valor}}",
    "catalogo": "Catalog",
    "motos": "Motorcycles",
    "productos": "Products",
    "inicioSesion": "Login"
}
},
es: {
translation: {
    "bienvenida": "Bienvenido a mi app",
    "usuario": "Usuario: {{nombre}}",
    "contador_texto":"Contador:{{valor}}",
    "catalogo": "Catalogo",
    "motos": "Motos",
    "productos": "Productos",
    "inicioSesion": "Iniciar Sesion"
}
}
};
i18n
.use(LanguageDetector) 
.use(initReactI18next) 
.init({
resources,
fallbackLng: "es", 
interpolation: {
    escapeValue: false 
}
});

export default i18n;