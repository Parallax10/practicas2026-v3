"use client";
import { useEffect, useCallback} from "react";
import { themeStyles as styles } from '../config/index';
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { fetchProductos } from "./store/slices/prodSlice";
import { alternarFavoritos } from "./store/slices/favsSlice";
import { ProductoItem } from "../components/ProductoItem";



export default function products(){
    const favoritosRaw = useAppSelector((state:any) => state.favoritos?.value || []);
    const favoritos = favoritosRaw.map(String);
    
    const dispatch=useAppDispatch();
    useEffect(()=>{
        dispatch(fetchProductos())
    },[])
    const actualizarFavoritos = useCallback((id: string) => {
            dispatch(alternarFavoritos(id));
        }, []);

    const {items,template}=useAppSelector(state=>state.products)
    return(
        <div className={styles.maps}>
            {items.map(producto=>
                <ProductoItem
                key={producto.id}
                producto={producto}
                isActive={favoritos.includes((String(producto.id)))}
                template={template}
                onToggle={actualizarFavoritos}
                iconActive="❤️"
                iconInactive="🤍"
                />
            )}
        </div>
    )
}
