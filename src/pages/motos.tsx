"use client";
import { memo, useCallback, useEffect,useState } from "react";
import { themeStyles as styles } from '../config/index';
import { fetchMotos } from "./store/slices/motoSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { alternarCarrito } from "./store/slices/carritoSlice";

const MotoItem =memo(({moto,template,isInCart,onToggle}:any)=>{
    const [imagenActual, setImagenActual] = useState(moto.thumbnail);
    const tarjetaHTML=(moto:any,htmlBase:string)=>{
        const galleryHTML = moto.images && moto.images.length > 0
            ? moto.images.map((img: string) => `<img src="${img}" alt="thumb" />`).join('')
            : '';
        if (!htmlBase) return { __html: "" };
        const htmlFinal=htmlBase
        .replace(/{{url}}/g, moto.url)
        .replace(/{{thumbnail}}/g, imagenActual)
        .replace(/{{title}}/g, moto.title)
        .replace(/{{price}}/g, moto.price.toString())
        .replace(/{{engine}}/g, moto.engine)
        .replace(/{{year}}/g, moto.year.toString())
        .replace(/{{license}}/g, moto.license)
        .replace(/{{type}}/g, moto.type)
        .replace(/{{galleryHTML}}/g, galleryHTML);
        return { __html: htmlFinal };
    }
        
    return(
        <div className={styles.item}>
                    <div dangerouslySetInnerHTML={tarjetaHTML(moto, template)} style={{ width: '100%' }} />
                    {moto.images && moto.images.length > 0 && (
                        <div className="galeria-hover">
                            {moto.images.map((img: string, index: number) => (
                                <img onClick={() => setImagenActual(img)} />
                            ))}
                        </div>
                    )}
                    <button className={styles.btnFavorito} onClick={() => onToggle(String(moto.id))}>
                        {isInCart?"🛒":"🛍️"}
                    </button>
                </div>
    )
})
export default function Motos(){
    const carritoRaw=useAppSelector((state:any)=>state.carrito?.value || [])
    const carrito=carritoRaw.map(String)

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchMotos())
    },[dispatch])

    const {items,template} = useAppSelector(state=>state.motos)
    
    const handleToggleCarrito = useCallback((id: string) => {
        dispatch(alternarCarrito(id));
    }, [dispatch]);

    return (
        <div className={styles.maps}>
            {items.map((moto:any) => (
                <MotoItem 
                    key={moto.id} 
                    moto={moto} 
                    template={template}
                    isInCart={carrito.includes(String(moto.id))}
                    onToggle={handleToggleCarrito}
                />
            ))}
        </div>
    );
}