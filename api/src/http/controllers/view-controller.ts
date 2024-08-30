import { Request, Response } from "express";
import { readdirSync } from "node:fs";
import path from "node:path";

type ViewFilesType = {
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

            let contentType: string;
            let previewUrl: string | undefined = `${baseUrl}/${file}`;

            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'gif':
                    contentType = 'image';
                    break;
                case 'mp4':
                case 'webm':
                case 'ogg':
                    contentType = 'video';
                    break;
                case 'txt':
                case 'md':
                case 'json':
                case "pdf":
                    contentType = 'text';
                    previewUrl = undefined; // Arquivos de texto serão lidos e retornados como conteúdo
                    break;
                default:
                    contentType = 'unknown';
                    previewUrl = undefined;
                    break;
            }

            nameFiles.push({
                name: file.replace(`.${ext}`, ''),
                extension: ext,
                previewUrl,
                contentType
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
