"use client";
import { useState, useEffect } from "react";
import { themeStyles as styles } from '../config/index';
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { fetchProductos } from "./store/slices/prodSlice";
import { alternarFavoritos } from "./store/slices/favsSlice";

export default function products(){
    const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>({});

    const favoritosRaw = useAppSelector((state:any) => state.favoritos?.value || []);
    const favoritos = favoritosRaw.map(String);
    
    const dispatch=useAppDispatch();
    useEffect(()=>{
        dispatch(fetchProductos())
    },[])

    const {items,template}=useAppSelector(state=>state.products)
    
    const tarjetaHTML=(producto:any,htmlBase:string)=>{
        const currentMainImage = selectedImages[producto.id] || producto.thumbnail;
        const galleryHTML = producto.images && producto.images.length > 0
        ? producto.images.map((img: string) => `<img src="${img}" alt="thumb" />`).join('')
        : '';
        if (!htmlBase) return { __html: "" };
        const htmlFinal=htmlBase
        .replace(/{{url}}/g, producto.url)
        .replace(/{{thumbnail}}/g, currentMainImage)
        .replace(/{{title}}/g, producto.title)
        .replace(/{{price}}/g, producto.price.toString())
        .replace(/{{brand}}/g, producto.brand.name)
        .replace(/{{category}}/g, producto.categories.name.toString())
        .replace(/{{galleryHTML}}/g, galleryHTML);
        return { __html: htmlFinal };
    }
        const changeImage = (prodId: string, imageUrl: string) => {
        setSelectedImages(prev => ({
            ...prev,
            [prodId]: imageUrl
        }));
    };
    return(
        <div className={styles.maps}>
            {items.map(producto=>
                <div key={producto.id} className={styles.item}>
                    <div dangerouslySetInnerHTML={tarjetaHTML(producto,template)} style={{width:"100%"}}/>
                        {producto.images &&producto.images.length>0&&(
                            <div className="galeria-hover">
                                {producto.images.map((img:string,index:number)=>(
                                    <img onClick={() => changeImage(producto.id, img)} key={index} src={img} alt={`foto extra ${index}`} />
                                ))}
                            </div>
                        )}
                        <button className={styles.btnFavorito} onClick={() => dispatch(alternarFavoritos(String(producto.id)))}>
                            {favoritos.includes(String(producto.id))?"❤️":"🤍"}
                        </button>
                </div>
            )}
        </div>
    )
}
