
const TitleOfMainMovie = ({title, overview}) => {
    return (
        <div className="w-screen h-screen overflow-hidden absolute px-20 pt-[23%] text-white bg-gradient-to-r from-black bg-opacity-50 z-10">
            <h2 className="text-4xl font-bold tracking-tight italic font-[cursive]">{title}</h2>
            <p className="w-5/12 py-3 text-md">{overview.length <= 340 ? overview: overview.substring(0, 340)+"......"}</p>
            <div className="space-x-3">
                <button className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-opacity-95 cursor-pointer">Play</button>
                <button className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-gray-400 cursor-pointer">More Info</button>
            </div>
        </div>
    );
}

export default TitleOfMainMovie;
