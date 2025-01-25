import { useState } from "react";

const TitleOfMainMovie = ({title, overview}) => {

    const {overviewLength, setOverviewLength} = useState(overview.length);

    return (
        <div className="w-screen h-[30vh] md:h-full overflow-hidden absolute px-5 mt-16 md:mt-0 md:px-20 pt-[35%] md:pt-[42%] lg:pt-[35%] text-white bg-gradient-to-r from-black bg-opacity-50 z-10 space-y-5">
            <h2 className="text-4xl font-bold tracking-tight italic font-[cursive]">{title}</h2>
            <p className="w-5/12 py-3 text-xl hidden lg:block">{overview.length <= 300 ? overview: overview.substring(0, 300)+"......"}</p>
            <div className="space-x-3">
                <button className="px-2 py-1 md:px-4 md:py-2 text-sm bg-white text-black font-semibold rounded-md hover:bg-opacity-95 cursor-pointer">Play</button>
                <button className="px-2 py-1 md:px-4 md:py-2 text-sm bg-purple-500 text-white font-semibold rounded-md hover:bg-gray-400 cursor-pointer">More Info</button>
            </div>
        </div>
    );
}

export default TitleOfMainMovie;
