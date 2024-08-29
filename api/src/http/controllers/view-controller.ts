import { Request, Response } from "express";
import { readdirSync } from "node:fs";
import path from "node:path"

type ViewFilesType = {
    name: string;
    extension: string
}

export async function viewController(req: Request, res: Response){
    const directoryPath = path.join(__dirname, "..", "..", 'uploads');
    
    try {
        let nameFiles: ViewFilesType[] = []
        const files = readdirSync(directoryPath)
        files.forEach(file => {
            const ext = file.split(".")

            nameFiles.push({
                name: ext[0],
                extension: ext[1]
            })
        });

        return res.send({
            filesNames: nameFiles
        })

      } catch (err) {
        console.error('Erro ao ler o diretório:', err);
        return res.status(500).send({
            error: "Error ao ler diretório"
        })
      }
}