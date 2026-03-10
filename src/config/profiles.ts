import { lolaMoto } from './lolamoto';
import { interMoto } from './interMoto';
import { ElMotorista } from './elMotorista';



const profileMap: Record<string, any> = {
    "LolaMoto": lolaMoto,
    "Intermoto": interMoto,
    "El Motorista": ElMotorista
};

const currentKey = process.env.NEXT_PUBLIC_SITE_NAME;

export const config = profileMap[currentKey] || ElMotorista;

export const profiles = profileMap;