import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsThreeOutlineVertical } from '@phosphor-icons/react';
import { api } from '../../lib/axios';

type DropdownProps = {
    name: string,
    extension: string,
}
export function Dropdown({name, extension}: DropdownProps) {

    async function handleDownloadFile(name: string, extension: string) {
        try {
            console.log(`Downloading ${name}`);
            
            const response = await api.get(`/download/${name}.${extension}`, {
                responseType: 'blob', // Obtém o arquivo como um blob
            });
    
            // Cria um URL para o blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            
            // Cria um link temporário e simula um clique para iniciar o download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${name}.${extension}`);
            document.body.appendChild(link);
            link.click();
            
            // Limpa o URL e remove o link temporário
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
            alert("Error ao baixar o arquivo :(")
        }
    }

    async function handleDeleteFile(name: string, extension: string) {
        try {
            await api.delete(`/files/${name}.${extension}`);
            alert("Arquivo deletado com sucesso!")
        } catch (error) {
            console.error('Error deleting file:', error);
            alert("Error ao deletar o arquivo :(")
        }
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <DotsThreeOutlineVertical size={20} weight="fill"/>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
            <DropdownMenu.Content
                className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
            >
                <DropdownMenu.Item className="group text-[15px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                onClick={()=>handleDownloadFile(name, extension)}
                >
                Download arquivo
                </DropdownMenu.Item>
                <DropdownMenu.Item className="group text-[15px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                onClick={()=>handleDeleteFile(name, extension)}
                >
                Deletar arquivo
                </DropdownMenu.Item>

                <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};
