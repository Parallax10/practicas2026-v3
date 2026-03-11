"use client";
import { useEffect } from "react";
import { themeStyles as styles } from '../config/index';
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { fetchProductos } from "./store/slices/prodSlice";
import { alternarFavoritos } from "./store/slices/favsSlice";

export default  function Favoritos(){
    const dispatch=useAppDispatch()
    const favoritos=useAppSelector((state:any)=>state.favoritos.value||[])
    const {items:productos,template}=useAppSelector((state)=>state.products)
    useEffect(()=>{
        dispatch(fetchProductos())
    },[dispatch])
    const productosFavoritos=(productos||[]).filter((prod)=>(
        favoritos.includes(prod.id.toString())
    ))
    const tarjetaHTML=(producto:any,htmlBase:string)=>{
        
        if (!htmlBase) return { __html: "" };
        const htmlFinal=htmlBase
        .replace(/{{url}}/g, producto.url)
        .replace(/{{thumbnail}}/g, producto.thumbnail)
        .replace(/{{title}}/g, producto.title)
        .replace(/{{price}}/g, producto.price.toString())
        .replace(/{{brand}}/g, producto.brand.name)
        .replace(/{{category}}/g, producto.categories.name.toString())
        .replace(/{{galleryHTML}}/g, "");
        return { __html: htmlFinal };
    }
    if(favoritos.length===0){
        return(
            <div>
                <p>Por el momento no tienes ningun producto en favoritos</p>
            </div>
        )
    }
    if(!productos ||productos.length===0){
        return<p>Cargando favoritos</p>
    }
    return(
        <div className={styles.maps}>
            {productosFavoritos.map((producto:any)=>
                <div key={producto.id} className={styles.item}>
                    <div dangerouslySetInnerHTML={tarjetaHTML(producto,template)} style={{width:"100%"}}/>
                        <button className={styles.btnFavorito} onClick={() => dispatch(alternarFavoritos(String(producto.id)))}>
                            {favoritos.includes(String(producto.id))?"❤️":"🤍"}
                        </button>
                </div>
            )}
        </div>
    )
}