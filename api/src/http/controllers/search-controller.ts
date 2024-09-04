import { Request, Response } from "express";
import path from "node:path";
import { ViewFilesType } from "./view-controller";
import { readdirSync } from "node:fs";
import { extensionHelper } from "../../lib/extension-helper";

export async function searchController(req: Request, res:Response){
    const directoryPath = path.join(__dirname, "..", "..", 'uploads');
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;

    try {
        let nameFiles: ViewFilesType[] = [];
        const files = readdirSync(directoryPath);

        const filesFiltedByName = files.filter(file => {
            return file.includes(req.query.name as string);
        })

        filesFiltedByName.forEach(file => {
            const ext = file.split(".").pop() as string;

            // Retorna um objeto com a extensão e a url de preview
            const resultExtension = extensionHelper(ext, baseUrl, file);

            nameFiles.push({
                name: file.replace(`.${ext}`, ''),
                extension: ext,
                previewUrl: resultExtension.previewUrl,
                contentType: resultExtension.contentType
            });
        });

        return res.send({
            files: nameFiles
        });

    } catch (error) {
        console.error('Erro ao ler o diretório:', error);
        return res.status(500).send({
            error: "Erro ao ler diretório"
        });
    }
}