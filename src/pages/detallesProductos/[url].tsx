"use client";
import { themeStyles as styles } from '../../config/index';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProductos, selectProductoByUrl } from "../store/slices/prodSlice";
import { remoteLog } from "../utils/logger";
export default function detallesProductos() {
    const usuario = useAppSelector((state) => state.user?.nombre);
    const router = useRouter();
    const {url} = router.query;
    const dispatch = useAppDispatch();
    const producto=useAppSelector((state)=>selectProductoByUrl(state,url))
    const {items, status} = useAppSelector((state) => state.products);
    const [indiceImagenes,setIndiceImagenes]=useState(0)
    const [grande,setGrande]=useState(false)
    useEffect(()=>{
            if(items.length===0 && status==="idle") dispatch(fetchProductos())
        }, [items.length, status, dispatch]);

        if(!producto) return<div><p>No hay productos</p></div>
    async function siguiente(): Promise<void> {
        if (usuario) {
            await remoteLog('info', `Usuario ${usuario} pasó a la siguiente imagen del producto ${producto.title}`);
        } else {
            await remoteLog('info', `Usuario Invitado pasó a la siguiente imagen del producto ${producto.title}`);
        }
        if(indiceImagenes===producto.images.length-1){
            setIndiceImagenes(0)
        }
        else if(indiceImagenes>=0){
            setIndiceImagenes(indiceImagenes+1)
        }
    }
    async function anterior(): Promise<void> {
        if (usuario) {
            await remoteLog('info', `Usuario ${usuario} pasó a la imagen anterior del producto ${producto.title}`);
        } else {
            await remoteLog('info', `Usuario Invitado pasó a la imagen anterior del producto ${producto.title}`);
        }
        if (!producto) return;
        if(indiceImagenes===producto.images.length){
            setIndiceImagenes(producto.images.length-1)
        }
        else if(indiceImagenes===0){
            setIndiceImagenes(producto.images.length-1)
        }
        else{
            setIndiceImagenes(indiceImagenes-1)
        }
    }

    return(
        <div className={styles.mapsDetalle}>
            <head>
                <title>{producto.title + " |El Motorista"}</title>
            </head>
            <p className={styles.nombreDetalle}>{producto.title}</p>
            <div className={styles.imagenesDetalle}>
                <img src={producto.images[0]}  onClick={()=>setGrande(true)}/>
                {grande &&(
                    <div className={styles.lightbox}>
                        <button className={styles.cerrar} onClick={()=>setGrande(false)}>
                            X
                        </button>
                        <button className={styles.izquierda} onClick={()=>anterior()}>
                            ⬅️
                        </button>
                        <img src={producto.images[indiceImagenes]}/>
                        <button className={styles.derecha} onClick={()=>siguiente()}>
                            ➡️
                        </button>
                    </div>
                )}
            </div>
            <p className={styles.marcaDetalle}>{producto.brand.name}</p>
            <p className={styles.marcaDetalle}>{producto.categories.name}</p>
            <p className={styles.precioDetalle}>{producto.price}€</p>
        </div>
    );
}
