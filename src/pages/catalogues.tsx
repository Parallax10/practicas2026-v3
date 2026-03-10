import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function catalogues(){
    const { t } = useTranslation();
    return(
        <div>
            <Link href="/motos">{t("motos")}</Link>
            <br/>
            <Link href="/products">{t("productos")}</Link>
        </div>
    )
}