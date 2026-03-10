import Navbar from './navbar';
import Footer from './footer';
import { themeStyles as styles } from '../config/index';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main className={styles.content}>
                {children}
            </main>
            <Footer />
        </div>
    );
}