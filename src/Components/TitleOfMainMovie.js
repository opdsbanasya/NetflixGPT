
const TitleOfMainMovie = ({title, overview}) => {
    return (
        <div className="pt-96 px-20">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="w-5/12 py-3 text-md">{overview}</p>
            <div className="space-x-3">
                <button className="px-4 py-2 bg-gray-200 text-black font-semibold rounded-md">Play</button>
                <button className="px-4 py-2 bg-gray-200 text-black font-semibold rounded-md">More Info</button>
            </div>
        </div>
    );
}

export default TitleOfMainMovie;
