import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import MoviePage from "./MoviePage";
import GPTSearch from "./GPTSearch";
import MainContainer from "./MainContainer";

const Body = () => {


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
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
}

export default Body;
