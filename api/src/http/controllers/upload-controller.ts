import { Request, Response } from "express";

export async function uploadController(req: Request, res: Response){
    if (!req.file) {
        return res.status(400).send({
            error: "Nenhum arquivo enviado!"
        });
    }
    res.send({
        message: "Arquivo salvo!",
        fileName: req.file.filename
    });
}