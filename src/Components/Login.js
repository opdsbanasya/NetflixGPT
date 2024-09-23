import { MAIN_BG_IMG } from "../utils/constant";
import Header from "./Header";

const Login = () => {
    return (
        <div className="relative ">
            <Header />
            <div className="h-screen w-full overflow-hidden">
                <img src={MAIN_BG_IMG} className="w-full object-cover object-center" alt="bg-img" />
            </div>
        </div>
    );
}

export default Login;
