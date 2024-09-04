import { app } from "./app";
import os from 'node:os';

function getLocalIp() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];
        if (interfaces) {
            for (const iface of interfaces) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    return iface.address;
                }
            }
        }
    }
    return '127.0.0.1'; // Fallback para localhost se o IP não for encontrado
}

app.listen({
    port: 4000,
}, ()=>{
    console.log(`Server online at http://${getLocalIp()}:4000`);
    console.log("Please, verify with the frontend are using the same IP address at 'drive-front/src/lib/axios.ts'");
})