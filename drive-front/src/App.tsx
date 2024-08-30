import { MagnifyingGlass } from "@phosphor-icons/react"
import icon from "./assets/icon.svg"
import mimic from "./assets/mimic.jpeg"

import { Items } from "./components/Items";
import { New } from "./components/New";
import { useEffect, useState } from "react";
import { api } from "./lib/axios";

export type FilesSaved = {
  name: string,
  extension: string,
  previewUrl: string,
  contentType: string
}
export function App() {

  const [filesSaved, setFilesSaved] = useState<FilesSaved[]>([])

  async function handleGetFiles(){
    const response = await api.get("/files")
    setFilesSaved(response.data.files)
  }

  useEffect(()=>{
      handleGetFiles()
  }, [])

  return (
    <>
      <header className="flex items-center mt-[72px] mx-[52px] justify-between">
        <div className="flex items-center gap-2">
            <img src={icon} className="grayscale"/>
            <h1 className="text-2xl">Ash</h1>
        </div>
        <form className="flex items-center">
            <input type="text" className="w-[650px] h-[60px] rounded-l-sm focus:border-none text-2xl p-2"/>
            <button type="submit" className="bg-[#C2E7FF] h-[60px] w-[105px] rounded-r-sm flex items-center pl-8 cursor-pointer">
                <MagnifyingGlass size={30}/>
            </button>
        </form>
        <div>
            <img src={mimic} className="rounded-full w-[52px] cursor-pointer hover:scale-125 transition"/>
        </div>
      </header>

      <New/>
      <div className="w-full px-10 mt-10">
        <div className="flex gap-5 flex-wrap">
          {filesSaved && filesSaved.length > 0 && filesSaved.map(data => (
            <Items 
              name={data.name} 
              extension={data.extension} 
              contentType={data.contentType}
              previewUrl={data.previewUrl}
              key={data.name}/>
          ))}
        </div>
      </div>
      
    </>
  )
}


