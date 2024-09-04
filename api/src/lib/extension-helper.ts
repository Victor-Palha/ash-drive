export function extensionHelper(extension: string, baseUrl: string, file: string){
    let previewUrl: string | undefined = `${baseUrl}/${file}`;

    switch (extension.toLowerCase()) {
        case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return {
                    contentType: 'image',
                    previewUrl
                };
            case 'mp4':
            case 'webm':
            case 'ogg':
                return {
                    contentType: 'image',
                    previewUrl
                };
            case 'txt':
            case 'md':
            case 'json':
            case "pdf":
                return {
                    contentType: 'image',
                    previewUrl: undefined
                };
            default:
                return {
                    contentType: 'unknown',
                    previewUrl: undefined
                };
    }
}