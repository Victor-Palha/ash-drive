import { Plus } from "@phosphor-icons/react";
import { api } from "../../lib/axios";
import { useState } from "react";

export function New(){

    const [progressBar, setProgressBar] = useState(0);

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            if (!selectedFile) return;

            const formData = new FormData();
            formData.append('file', selectedFile);
    
            try {
                const response = await api.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        if(progressEvent.total){
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setProgressBar(progress);
                            console.log(`Progress: ${progress}%`);
                            
                            if(progress === 100){
                                setTimeout(() => {
                                    setProgressBar(0);
                                }, 2000);
                            }
                        }
                    }
                });
                alert("Arquivo salvo com sucesso!")
                console.log('Upload successful:', response.data);
            } catch (error) {
                alert("Error ao salvar o arquivo :(")
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <nav className="ml-10 mt-6 w-[300px]">          
            <label htmlFor="file-upload" className="flex items-center gap-5 rounded-lg w-[140px] h-[60px] shadow-lg justify-center hover:scale-105 cursor-pointer">
                <Plus size={30} />
                <span>Novo</span>
            </label>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
            <div className="mt-5">
                <div className="bg-gray-200 w-full h-2 rounded-lg">
                    <div className="bg-blue-500 h-2 rounded-lg" style={{ width: `${progressBar}%` }}></div>
                </div>
            </div>
        </nav>
    )
} 