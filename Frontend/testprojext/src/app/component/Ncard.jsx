export  default function Ncard({ title, des }) {
  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl  hover:bg-lime-50 transition-shadow duration-200">
      <div className="p-1 w-full h-60 ">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center ">{title}</h3>
        <p className="text-blue-500 text-2xl leading-relaxed p-3 py-10">{des}</p>
      </div>
    </div>
  );
}
