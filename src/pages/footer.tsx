import { themeStyles as styles } from '../config/index';
export default function Footer() {
    function obtenerFecha(){
        const fecha = new Date();
        return fecha.toLocaleDateString('es-ES', 
            { year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
    }
return (
<footer className={`${styles.foot}`}>
    <p className={styles.texto}>Desarrollado por SOFGESA S.L. - {obtenerFecha()}</p>
</footer>
);
}