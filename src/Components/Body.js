import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import MoviePage from "./MoviePage";
import GPTSearch from "./GPTSearch";
import MainContainer from "./MainContainer";
import { useEffect } from "react";

const Body = () => {

    useEffect(()=>{
        setTimeout(()=> console.clear(), 10)
    },[])

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />,
            children: [
                { 
                    path: "", 
                    element: <MainContainer />
                },
                { 
                    path: "gpt-search", 
                    element: <GPTSearch />
                },
                { 
                    path: "movie-info", 
                    element: <MoviePage />
                }
            ]
        },
    ])


    return (
        <div className="selection:bg-[#424242] selection:bg-opacity-80">
            <RouterProvider router={appRouter} />
        </div>
    );
}

export default Body;
