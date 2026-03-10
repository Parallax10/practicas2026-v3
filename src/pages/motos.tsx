"use client";
import { useEffect } from "react";
import Link from "next/link";
import { themeStyles as styles } from '../config/index';
import { fetchMotos } from "./store/slices/motoSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";

export default function Motos(){
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchMotos())
    },[])
    const {items,template} = useAppSelector(state=>state.motos)
    const tarjetaHTML=(moto:any,htmlBase:string)=>{
        if (!htmlBase) return { __html: "" };
        const htmlFinal=htmlBase
        .replace(/{{url}}/g,moto.url)
        .replace(/{{thumbnail}}/g,moto.thumbnail)
        .replace(/{{title}}/g,moto.title)
        .replace(/{{price}}/g,moto.price)
        .replace(/{{classLista}}/g,styles.lista)
        .replace(/{{classImagen}}/g,styles.imagen)
        .replace(/{{classPrecio}}/g,styles.precio)
        .replace(/{{classNombre}}/g,styles.nombre)
        return { __html: htmlFinal };
    }
    return(
        <div className={styles.maps}>
            {items.map(moto=>
                <div key={moto.id} className={styles.item} dangerouslySetInnerHTML={tarjetaHTML(moto,template)}/>
            )}
        </div>
    )
}