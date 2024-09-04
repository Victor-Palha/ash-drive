import { Panorama, FilePdf, VideoCamera, FileDoc, File as Unknowfile } from "@phosphor-icons/react";
import { FilesSaved } from "../../App";
import { Dropdown } from "../Dropdown";

export function Items(data: FilesSaved) {
    let icon;
    let iconColor = "#f28b82"; // Default color

    switch (data.contentType) {
        case 'image':
            icon = <Panorama size={30} weight="fill" color={iconColor} />;
            break;
        case 'video':
            icon = <VideoCamera size={30} weight="fill" color={iconColor} />;
            break;
        case 'pdf':
            icon = <FilePdf size={30} weight="fill" color={iconColor} />;
            break;
        case "document":
            icon = <FileDoc size={30} weight="fill" color={iconColor} />;
            break;
        default:
            icon = <Unknowfile size={30} weight="fill" color={iconColor} />;
            break;
    }

    return (
        <div className="w-[238px] h-[238px] p-[13px] rounded-lg shadow-xl border-2">
            <div className="flex items-center justify-between">
                {icon}
                <p className="truncate ... ml-5 max-w-[140px]">{data.name}</p>
                <Dropdown name={data.name} extension={data.extension}/>
            </div>
            <div className="max-w-[212px] w-[212px] max-h-[153px] h-[153px] rounded-md shadow-inner mb-[29px] flex items-center border-2">
                {data.previewUrl ? (
                    <img
                        className="block mx-auto object-cover max-w-[212px] max-h-[153px] overflow-hidden"
                        src={data.previewUrl}
                    />
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        {icon}
                    </div>

                )}
            </div>
        </div>
    );
}
