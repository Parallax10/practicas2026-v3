"use client";
import { themeStyles as styles } from '../../config/index';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMotos, selectMotoByUrl } from "../store/slices/motoSlice";
import { remoteLog } from "../utils/logger";
export default function DetallesMotos() {
    const usuario = useAppSelector((state) => state.user?.nombre);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {url} = router.query;
    const [indiceImagenes,setIndiceImagenes]=useState<number>(0)
    const [grande,setGrande]=useState<boolean>(false)
    const moto=useAppSelector((state)=>selectMotoByUrl(state,url))
    const {items, status} = useAppSelector((state) => state.motos);
    console.log("MOTO EN DETALLES:", moto);
    
    useEffect(()=>{
        if(items.length===0 && status==="idle") dispatch(fetchMotos())
    }, [items.length, status, dispatch]);

    if(!moto) return (<div>Sin motos</div>);
    
    async function siguiente(): Promise<void> {
        if (usuario) {
            await remoteLog('info', `Usuario ${usuario} pasó a la siguiente imagen de la moto ${moto.title}`);
        } else {
            await remoteLog('info', `Usuario Invitado pasó a la siguiente imagen de la moto ${moto.title}`);
        }
        if(indiceImagenes===moto.images.length-1){
            setIndiceImagenes(0)
        }
        else if(indiceImagenes>=0){
            setIndiceImagenes(indiceImagenes+1)
        }
    }
    async function anterior(): Promise<void> {
        if (usuario) {
            await remoteLog('info', `Usuario ${usuario} pasó a la imagen anterior de la moto ${moto.title}`);
        } else {
            await remoteLog('info', `Usuario Invitado pasó a la imagen anterior de la moto ${moto.title}`);
        }
        if (!moto) return;
        if(indiceImagenes===moto.images.length){
            setIndiceImagenes(0)
        }
        else if(indiceImagenes===0){
            setIndiceImagenes(moto.images.length-1)
        }
        else{
            setIndiceImagenes(indiceImagenes-1)
        }
    }
    async function cambiarZoom(): Promise<void> {
        if (usuario) {
            await remoteLog('info', `Usuario ${usuario} cambió el zoom de la imagen de la moto ${moto.title}`);
        } else {
            await remoteLog('info', `Usuario Invitado cambió el zoom de la imagen de la moto ${moto.title}`);
        }
        setGrande(!grande);
    }
    return(
        <div className={styles.mapsDetalle}>
            <head>
                <title>{moto.title + " |El Motorista"}</title>
            </head>
            <p className={styles.nombreDetalle}>{moto.title}</p>
            
            <div className={styles.imagenesDetalle}>
                <img src={moto.images[0]}  onClick={()=>cambiarZoom()}/>
                {grande &&(
                    <div className={styles.lightbox}>
                        <button className={styles.cerrar} onClick={()=>cambiarZoom()}>
                            X
                        </button>
                        <button className={styles.izquierda} onClick={()=>anterior()}>
                            ⬅️
                        </button>
                        <img src={moto.images[indiceImagenes]}/>
                        <button className={styles.derecha} onClick={()=>siguiente()}>
                            ➡️
                        </button>
                    </div>
                )}
            </div>
            
            <p className={styles.marcaDetalle}>Permiso {moto.license}</p>
            <p className={styles.marcaDetalle}>{moto.type}: {moto.year}</p>
            <p className={styles.precioDetalle}>{moto.price}€</p>
        </div>
    );
}
