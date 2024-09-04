import { Request, Response } from "express";
import path from "node:path";
import {unlinkSync} from "node:fs"

export async function deleteController(req:Request, res:Response){
    const name = req.params.name;

    if(!name){
        return res.status(400).send({
            error: "Nome do arquivo não informado!"
        });
    }

    const directoryPath = path.join(__dirname, "..", "..", 'uploads');

    try {
        unlinkSync(`${directoryPath}/${name}`);
        return res.send({
            message: "Arquivo deletado com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao deletar arquivo:', error);
        return res.status(500).send({
            error: "Erro ao deletar arquivo"
        });
    }
}