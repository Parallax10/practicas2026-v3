"use client"
import { memo } from "react";
import { useState } from "react";
import { themeStyles as styles } from '../config/index';
import Handlebars from "handlebars";

export const ProductoItem=memo(({producto,template,isInFavs,onToggle}:any)=>{
    const [imagenActual, setImagenActual] = useState(producto.thumbnail);
    
    const tarjetaHTML=(producto:any,htmlBase:string)=>{
        console.log("se cargo el produto",producto.id)
        const galleryHTML = producto.images && producto.images.length > 0
        ? producto.images.map((img: string) => `<img src="${img}" alt="thumb" />`).join('')
        : '';
        if (!htmlBase) return { __html: "" };
        const htmlFinal=htmlBase
        .replace(/{{url}}/g, producto.url)
        .replace(/{{thumbnail}}/g, imagenActual)
        .replace(/{{title}}/g, producto.title)
        .replace(/{{price}}/g, producto.price.toString())
        .replace(/{{brand}}/g, producto.brand.name)
        .replace(/{{category}}/g, producto.categories.name.toString())
        .replace(/{{galleryHTML}}/g, galleryHTML);
        return { __html: htmlFinal };
    }

    return(
        <div key={producto.id} className={styles.item}>
            <div dangerouslySetInnerHTML={tarjetaHTML(producto,template)} style={{width:"100%"}}/>
                {producto.images &&producto.images.length>0&&(
                    <div className="galeria-hover">
                        {producto.images.map((img:string,index:number)=>(
                            <img onClick={() => setImagenActual(img)} key={index} src={img} alt={`foto extra ${index}`} />
                        ))}
                    </div>
                )}
                <button className={styles.btnFavorito} onClick={() => onToggle((String(producto.id)))}>
                    {isInFavs?"❤️":"🤍"}
                </button>
        </div>
    )
})