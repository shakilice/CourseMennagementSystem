import Vedio from "../pagecom/Vedio.jsx"
export default function Mainpage() {
  const url = "https://www.youtube-nocookie.com/embed/K2hHOAtkwwk?si=CrUa6rgxSvkPIZgV&modestbranding=1&rel=0&controls=1";
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <input
        className="bg-black text-white rounded-2xl w-full max-w-xl h-10 text-left font-bold mt-1 ml-70 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="w-full flex flex-row flex-wrap gap-2 justify-start">
        <Vedio vediourl={url} title={"Ai Model"} channename={"Larn with sumit"} />
        <Vedio vediourl={url} title={"Ai Model"} channename={"Larn with sumit"} />
        <Vedio vediourl={url} title={"Ai Model"} channename={"Larn with sumit"} />
        <Vedio vediourl={url} title={"Ai Model"} channename={"Larn with sumit"} />
        <Vedio vediourl={url} title={"Ai Model"} channename={"Larn with sumit"} />
      </div>
    </div>
  );
}