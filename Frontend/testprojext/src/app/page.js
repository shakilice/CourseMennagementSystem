import Link from 'next/link';
import Ncard from './component/Ncard.jsx'
import { page_hading } from '../../public/data.js';
export default function Home() {

  return (
    <div className="flex flex-col w-full">
      < div className="bg-[url('/educationalbg.jpg')] bg-cover bg-center w-full h-[400px] rounded-2xl bg-blue-50  flex flex-col items-center justify-center">
          <h1 className="text-lime-300 text-center mt-1 text-bold text-8xl"> <i>Welcome to the Excillint online Education Platfrom</i></h1>
          <Link          
           href="/Createpages/Course"
           className="text-2xl text-white text-center mt-10 w-50 bg-slate-500 h-10 rounded-2xl hover:bg-green-600 transition-colors duration-300"
          >
           Brouse course
          </Link>
      </div> 
       <div className="w-full ">
          <div className="h-full w-full flex flex-row gap-2 my-5 ">
         <Ncard title={page_hading.title1} des={page_hading.description1}/>
          <Ncard title={page_hading.title2} des={page_hading.description2}/>
           <Ncard title={page_hading.title3} des={page_hading.description3}/>
          </div>
          <div className="text-semibolod">{page_hading.page_des}</div>
       </div>
    </div>
  );
}
