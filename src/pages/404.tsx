import Link from "next/link";
export default function Custom404() {
return (
<div>
    <h1>404</h1>
    <p>Página no encontrada</p>
    <Link href="/">Volver a inicio</Link>
</div>
);
}