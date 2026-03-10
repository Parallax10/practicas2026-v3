type LogLevel = 'info' | 'warn' | 'error';

export const remoteLog = async (level: LogLevel, message: string, error?: any) => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : 'server-side';

try {
    await fetch('/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        level,
        message,
        path: currentPath, 
        stack: error instanceof Error ? error.stack : null,
    }),
    });
} catch (err) {
    console.error("Error al enviar log:", err);
}
};