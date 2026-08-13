import GPTMovieSuggestion from "../../Components/GPTMovieSuggestion";
import GPTSearchBar from "../../Components/GPTSearchBar";

import Header from "../../Components/Header";

export default function GPTSearchPage() {
    return (
        <div className="w-full h-screen bg-[#050505] text-white flex flex-col overflow-hidden">
            <Header />
            <div className="flex-1 flex flex-col md:flex-row mt-20 h-[calc(100vh-80px)]">
                {/* Left Panel: Chat Interface */}
                <div className="w-full md:w-[40%] lg:w-[35%] h-full border-r border-white/5 bg-[#0a0a0a]">
                    <GPTSearchBar />
                </div>
                
                {/* Right Panel: Recommendations */}
                <div className="w-full md:w-[60%] lg:w-[65%] h-full bg-[#050505] overflow-y-auto custom-scrollbar">
                    <GPTMovieSuggestion />
                </div>
            </div>
        </div>
    );
}
