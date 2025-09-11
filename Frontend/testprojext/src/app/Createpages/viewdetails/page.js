'use client'
import { useDetails } from "../pagecom/VedioProvider"

export default function view(){
    const {vediodet,setVediodet}=useDetails();
    return (
        <div>
        <div className="bg-white w-full h-full flex flex-row">
            <div className="w-[2000px] h-[450px] border-1 rounded-xl border-gray-200">
    <iframe
    className="w-full h-full rounded-xl shadow-lg bg-amber-50"
     src={vediodet.url}
    title="YouTube video player"
    alt="nai"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen>

    </iframe>
            </div>
            <div  className="w-full h-[450px] border-2 border-amber-950 bg-black text-white">
              comment section
            </div>
           
            </div>
            <div className="  flex flex-col w-full">
                <h3 className="text-bold text-2xl">{vediodet.title}</h3>
                <div className="flex flex-row gap-3 w-full justify-between">
                    <h1>{vediodet.channel_name}</h1>

                </div>
                </div>
        </div>
    )
}