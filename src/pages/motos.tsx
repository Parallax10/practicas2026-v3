"use client";
import {  useCallback, useEffect } from "react";
import { themeStyles as styles } from '../config/index';
import { fetchMotos } from "./store/slices/motoSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { alternarCarrito } from "./store/slices/carritoSlice";
import { ProductoItem } from "../components/ProductoItem";

export default function Motos(){
    const carritoRaw=useAppSelector((state:any)=>state.carrito?.value || [])
    const carrito=carritoRaw.map(String)

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchMotos())
    },[])

    const {items,template} = useAppSelector(state=>state.motos)
    
    const actualizarCarrito = useCallback((id: string) => {
        dispatch(alternarCarrito(id));
    }, []);

    return (
        <div className={styles.maps}>
            {items.map((moto:any) => (
                <ProductoItem 
                    key={moto.id} 
                    producto={moto} 
                    template={template}
                    isActive={carrito.includes(String(moto.id))}
                    onToggle={actualizarCarrito}
                    iconActive="🛒"
                    iconInactive="🛍️"
                />
            ))}
        </div>
    );
}