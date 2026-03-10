import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { level, message, path: routePath, stack } = req.body; 
        
        const rutaLogs = path.join(process.cwd(), 'logs');
        const nombreArchivo = `${new Date().toISOString().split('T')[0]}.log`;
        const rutaArchivo = path.join(rutaLogs, nombreArchivo);

    if (!fs.existsSync(rutaLogs)) fs.mkdirSync(rutaLogs);
        const registro = `[${new Date().toISOString()}] [${level.toUpperCase()}] [Origen: ${routePath}]: ${message} ${stack || ''}\n`;

    try {
        fs.appendFileSync(rutaArchivo, registro);
        return res.status(200).json({ status: 'success' });
    } catch (error) {
        return res.status(500).json({ status: 'error' });
        }
    }
    res.status(405).end();
}