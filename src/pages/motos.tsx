"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { themeStyles as styles } from '../config/index';
import { fetchMotos } from "./store/slices/motoSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { alternarCarrito } from "./store/slices/carritoSlice";

export default function Motos(){
    const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>({});

    const carritoRaw=useAppSelector((state:any)=>state.carrito?.value || [])
    const carrito=carritoRaw.map(String)

    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchMotos())
    },[])
    const {items,template} = useAppSelector(state=>state.motos)
    
    const tarjetaHTML=(moto:any,htmlBase:string)=>{
        const currentMainImage = selectedImages[moto.id] || moto.thumbnail;
        const galleryHTML = moto.images && moto.images.length > 0
        ? moto.images.map((img: string) => `<img src="${img}" alt="thumb" />`).join('')
        : '';
        if (!htmlBase) return { __html: "" };
        const htmlFinal=htmlBase
        .replace(/{{url}}/g, moto.url)
        .replace(/{{thumbnail}}/g, currentMainImage)
        .replace(/{{title}}/g, moto.title)
        .replace(/{{price}}/g, moto.price.toString())
        .replace(/{{engine}}/g, moto.engine)
        .replace(/{{year}}/g, moto.year.toString())
        .replace(/{{license}}/g, moto.license)
        .replace(/{{type}}/g, moto.type)
        .replace(/{{galleryHTML}}/g, galleryHTML);
        return { __html: htmlFinal };
    }
    

    const changeImage = (motoId: string, imageUrl: string) => {
        setSelectedImages(prev => ({
            ...prev,
            [motoId]: imageUrl
        }));
    };
    return (
        <div className={styles.maps}>
            {items.map(moto => (
                <div key={moto.id} className={styles.item}>
                    <div dangerouslySetInnerHTML={tarjetaHTML(moto, template)} style={{ width: '100%' }} />
                    {moto.images && moto.images.length > 0 && (
                        <div className="galeria-hover">
                            {moto.images.map((img: string, index: number) => (
                                <img onClick={() => changeImage(moto.id, img)} key={index} src={img} alt={`foto extra ${index}`} />
                            ))}
                        </div>
                    )}
                    <button className={styles.btnFavorito} onClick={() => dispatch(alternarCarrito(String(moto.id)))}>
                        {carrito.includes(String(moto.id))?"🛒":"🛍️"}
                    </button>
                </div>
            ))}
        </div>
    );
}