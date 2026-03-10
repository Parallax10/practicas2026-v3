import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { themeStyles as styles } from '../config/index';
import Link from "next/link";
import { useAppDispatch, useAppSelector } from './store/hooks';
import { logout } from './store/slices/userSlice';
import { remoteLog } from './utils/logger';
export default function Navbar() {
    const usuario = useAppSelector((state) => state.user?.nombre);
    const { t, i18n } = useTranslation();
    const pagina = process.env.NEXT_PUBLIC_APP_PROFILE;
    const [catalogos, setCatalogos] = useState(false);
    useEffect(() => {
        if (pagina === "ElMotorista") {
            setCatalogos(true);
        }
        }, [pagina]);
    const cambiarIdioma = (idioma) => {
        if (usuario) {
            remoteLog(`info`, `${usuario} ha cambiado el idioma a ${idioma}`);
        }
        else {
            remoteLog(`info`, `Usuario invitado ha cambiado el idioma a ${idioma}`);
        }
        i18n.changeLanguage(idioma);
    };
    const dispatch = useAppDispatch();
    function cerrarSesion(){
        dispatch(logout());
    }
    
return (
<div className={styles.cont}>
    
    <Link href={"http://localhost:3000/"}>
        <img className={styles.imagen} src="https://elmotorista.net/wp-content/uploads/sites/21/2023/09/logo-.png" width={130}></img>
    </Link>

    <p className={styles.text}>{pagina}</p>
    { catalogos ?(
        <Link href={"http://localhost:3000/catalogues"} className={styles.link}>{t("catalogo")}</Link>
    ):<></>
    }
    {usuario ?     
        <div>
            <p className={styles.text}>Hola: {usuario}</p> 
            <button onClick={()=>cerrarSesion()}>Cerrar Sesión</button>
        </div>
    :<Link href={"http://localhost:3000/login"} className={styles.link}>{t("inicioSesion")}</Link>}
    
    <button onClick={() => cambiarIdioma('es')}className={i18n.language === 'es' ? styles.active : styles.btn}>ES</button>
    <button onClick={() => cambiarIdioma('en')}className={i18n.language === 'en' ? styles.active : styles.btn}>EN</button>
</div>
);
}