"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { themeStyles as styles } from '../config/index';
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { fetchProductos } from "./store/slices/prodSlice";

export default function products(){
    const dispatch=useAppDispatch();
    useEffect(()=>{
        dispatch(fetchProductos())
    },[])
    const {items}=useAppSelector(state=>state.products)
    return(
        <div className={styles.maps}>
            {items.map(producto=>
                <div key={producto.id} className={styles.item}>
                    <ul className={styles.lista}>
                        <li className={styles.imagen}>
                            <Link href={`/detallesProductos/${producto.url}`}>
                                <img src={producto.thumbnail} alt={producto.title}></img>
                            </Link>
                        </li>
                        <li className={styles.nombre}>
                            <p>{producto.title}</p>
                        </li>
                        <li className={styles.precio}>
                            {producto.price}€
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}
