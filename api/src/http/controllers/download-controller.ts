import { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs"

export async function downloadController(req: Request, res: Response){
    const {name} = req.params
    const filePath = path.join(__dirname, "..", "..", 'uploads', name)
    
    fs.stat(filePath, (error, stats) => {
        if(error){
            console.log(error)
            return res.status(404).send({
                error: "Arquivo não encontrado :("
            })
        }
        // HTTP Headers
        res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);
        res.setHeader('Content-Length', stats.size);
        res.setHeader('Content-Type', 'application/octet-stream');

        const fileStream = fs.createReadStream(filePath)

        fileStream.pipe(res)

        fileStream.on('error', (err) => {
            console.error(err);
            res.status(500).send('Erro ao transferir o arquivo.');
        });
    })
}