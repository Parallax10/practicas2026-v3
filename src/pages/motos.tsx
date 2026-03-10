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
    const {items} = useAppSelector(state=>state.motos)
    return(
        <div className={styles.maps}>
            {items.map(moto=>
                <div key={moto.id} className={styles.item}>
                        <ul className={styles.lista}>
                            <li className={styles.imagen}>
                                <Link href={`/detallesMotos/${moto.url}`}>
                                    <img src={moto.thumbnail}></img>
                                </Link>
                            </li>
                            <li className={styles.nombre}>
                                <p>{moto.title}</p>
                            </li>
                            <li className={styles.precio}>
                                <p>{moto.price}€</p>
                            </li>
                        </ul>
                </div>
            )}
        </div>
    )
}