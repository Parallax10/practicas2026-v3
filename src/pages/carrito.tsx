"use client";
import { useEffect } from "react";
import { themeStyles as styles } from '../config/index';
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { fetchMotos } from "./store/slices/motoSlice";
import { alternarCarrito } from "./store/slices/carritoSlice";

export default function Carrito(){
    const dispatch=useAppDispatch()
    const carritoRaw=useAppSelector((state:any)=>state.carrito.value||[])
    const carrito=carritoRaw.map(String)
    const {items:motos,template}=useAppSelector((state)=>state.motos)
    useEffect(()=>{
        dispatch(fetchMotos())
    },[dispatch])
    const motosCarritos=(motos||[]).filter((moto:any)=>(carrito.includes(String(moto.id))
))
        
    const tarjetaHTML=(moto:any,htmlBase:string)=>{
        if (!htmlBase) return { __html: "" };
        const htmlFinal=htmlBase
        .replace(/{{url}}/g, moto.url)
        .replace(/{{thumbnail}}/g, moto.thumbnail)
        .replace(/{{title}}/g, moto.title)
        .replace(/{{price}}/g, moto.price.toString())
        .replace(/{{engine}}/g, moto.engine)
        .replace(/{{year}}/g, moto.year.toString())
        .replace(/{{license}}/g, moto.license)
        .replace(/{{type}}/g, moto.type)
        .replace(/{{galleryHTML}}/g, "");
        return { __html: htmlFinal };
    }
    if(carrito.length===0){
        return(
            <div>
                <p>Por el momento no hay ninguna moto en el carrito</p>
            </div>
        )
    }
    if(!motos|| motos.length===0){
        return<p>Cargando carrito</p>
    }
    console.log(carrito.length)
    return (
        <div className={styles.maps}>
            {motosCarritos.map((moto:any) => (
                <div key={moto.id} className={styles.item}>
                    <div dangerouslySetInnerHTML={tarjetaHTML(moto, template)} style={{ width: '100%' }} />
                    <button className={styles.btnFavorito} onClick={() => dispatch(alternarCarrito(String(moto.id)))}>
                        {carrito.includes(String(moto.id))?"🛒":"🛍️"}
                    </button>
                </div>
            ))}
        </div>
    );
}