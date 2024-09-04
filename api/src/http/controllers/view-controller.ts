import { Request, Response } from "express";
import { readdirSync } from "node:fs";
import path from "node:path";
import { extensionHelper } from "../../lib/extension-helper";

export type ViewFilesType = {
    name: string;
    extension: string;
    previewUrl?: string;
    contentType: string;
};

export async function viewController(req: Request, res: Response) {
    const directoryPath = path.join(__dirname, "..", "..", 'uploads');
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;

    try {
        let nameFiles: ViewFilesType[] = [];
        const files = readdirSync(directoryPath);

        files.forEach(file => {
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

    } catch (err) {
        console.error('Erro ao ler o diretório:', err);
        return res.status(500).send({
            error: "Erro ao ler diretório"
        });
    }
}
