"use client"
import { remoteLog } from './utils/logger';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import Motos from "./motos";
import Products from "./products";
import Catalogues from './catalogues';
import { useAppSelector } from './store/hooks';
import Head from 'next/head'; 

export default function Ejercicios() {
    const { t } = useTranslation();
    const usuario = useAppSelector((state) => state.user?.nombre);
    
    const pagina = process.env.NEXT_PUBLIC_APP_PROFILE;

    const [contador, setContador] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [msegundos, setMsegundos] = useState(0);
    
    useEffect(() => {
        const userLabel = usuario || "Invitado";
        remoteLog('info', `Usuario ${userLabel} accedió a la página de ${pagina}`);
    }, [pagina, usuario]);

    async function aumentar1() {
        const nuevoValor = contador + 1;
        setContador(nuevoValor);
        await remoteLog('info', `Usuario ${usuario || "Invitado"} incrementó el contador a ${nuevoValor}`);
    }

    async function reducir1() {
        const nuevoValor = contador - 1;
        setContador(nuevoValor);
        await remoteLog('info', `Usuario ${usuario || "Invitado"} redujo el contador a ${nuevoValor}`);
    }

    async function sumar1msc() {
        const ms = Math.floor(Math.random() * (2000 - 1000) + 1000);
        setMsegundos(ms);
        setTimeout(() => { aumentar1(); }, ms);
        await remoteLog('info', `Usuario ${usuario || "Invitado"} programó incremento en ${ms} ms`);
    }

    if (pagina === "Intermoto") {
        return (
            <>
                <Head><title>Inicio | Intermoto</title></Head>
                <Products />
            </>
        );
    } 
    
    if (pagina === "LolaMoto") {
        return (
            <>
                <Head><title>Inicio | Lola Moto</title></Head>
                <Motos />
            </>
        );
    }

    return (
        <div>
            <Head><title>Inicio | El Motorista</title></Head>
            <p>{t("contador_texto", { valor: contador })}</p>
            <button onClick={() => aumentar1()}>+1</button>
            <button onClick={() => reducir1()}>-1</button>
            <br />
            <input value={cantidad} type="number" onChange={(e) => setCantidad(Number(e.target.value))} 
            onKeyDown={(e) => {
                if (e.key === "Enter") setContador(contador + cantidad);
                }} 
            />
            <br />
            <button onClick={() => sumar1msc()}>+1 Async</button>
        </div>
    );
}