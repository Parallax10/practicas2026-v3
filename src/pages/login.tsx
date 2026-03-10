import { useState } from "react";
import { useAppDispatch } from "./store/hooks";
import { loginSuccess } from "./store/slices/userSlice";
import { useRouter } from "next/router";
import { remoteLog } from "./utils/logger";
export default function Login() {
    const[nombreUsuario, setNombreUsuario] = useState("");
    const[error, setError] = useState("");
    let guardarNombre=null;
    const dispatch = useAppDispatch();
    const router = useRouter();
    async function validarUsuario(){
        if(nombreUsuario === ""){
            remoteLog(`error`, "nombre de usuario vacío");
            setError("El nombre de usuario no puede estar vacio");
        }else{
            setError("");
            guardarNombre=sessionStorage.setItem("nombreUsuario", nombreUsuario);
            dispatch(loginSuccess(nombreUsuario));
            remoteLog(`info`, `Usuario ${nombreUsuario} ha iniciado sesión`);
            router.push("/");
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <div>
                <p>Nombre de Usuario</p>
                <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
                <p>{error}</p>
                <button onClick={()=>validarUsuario()}>Iniciar Sesion</button>
            </div>
        </div>
    );
}