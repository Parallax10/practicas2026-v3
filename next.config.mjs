import fs from 'fs';
import path from 'path';

const profile = process.env.NEXT_PUBLIC_APP_PROFILE || 'ElMotorista';

console.log(`sitio: ${profile}`);

let exportConfig = '';
let exportCSS = '';

if (profile === 'Intermoto') {
  exportConfig = `import { interMoto } from './interMoto';\nexport const config = interMoto;\n`;
  exportCSS = `export { default as themeStyles } from '../styles/intermoto.module.scss';\n`;
} 
else if (profile === 'LolaMoto') {
  exportConfig = `import { lolaMoto } from './lolamoto';\nexport const config = lolaMoto;\n`;
  exportCSS = `export { default as themeStyles } from '../styles/lolamoto.module.scss';\n`;
} 
else {
  exportConfig = `import { ElMotorista } from './elMotorista';\nexport const config = ElMotorista;\n`;
  exportCSS = `export { default as themeStyles } from '../styles/motorista.module.scss';\n`;
}

const contenidoIndex = `${exportConfig}\n${exportCSS}`;
const ruta = path.resolve('./src/config/index.ts');

try {
  fs.writeFileSync(ruta, contenidoIndex, 'utf-8');
  console.log(`index.ts cambiado para ${profile}.`);
} catch (error) {
  console.error(" Error al sobrescribir index.ts:", error);
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

};

export default nextConfig;