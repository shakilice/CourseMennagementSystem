'use client'
import { useDetails } from "./VedioProvider";
import { useRouter } from "next/navigation"; 
export default  function Vedio({vediourl,title,channename}){
    const router=useRouter();
    const {vediodet,setdetails}=useDetails()
    const click=()=>{
     const vediodetails={
    url:vediourl,
    page_id:"",
    title:title,
    channel_name:channename,
    description:""
   }
   setdetails(vediodetails);
   router.push('/Createpages/viewdetails');
   
}
    return (
        <>
        <div className="w-fullh-full text-black shadow-2xl flex flex-col gap-1 border-solid border-2 border-gray-100 bg-blue-50 rounded-xl">
            <iframe
    className="w-[305px] h-[200px] rounded-xl shadow-lg bg-black"
     src={vediourl}
    title="YouTube video player"
    alt="nai"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen></iframe>
            <div className="  flex flex-col w-full">
                <h3 className="text-bold text-2xl">{title}</h3>
                <div className="flex flex-row gap-3 w-full justify-between">
                    <h1>{channename}</h1>
                    <button  onClick={click} className="text-fuchsia-50 bg-blue-600 hover:bg-emerald-600 border-s-orange-950 h-10 w-25 ml-0 rounded-xl ">View details</button>
                </div>
            </div>
        </div>
        </>
    )
}