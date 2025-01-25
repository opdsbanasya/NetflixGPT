// import { NETFLIX_LOGO } from "../utils/constant";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../store/userSlice";
import { NETFLIX_LOGO } from "../utils/constant";
import { toggleGptSearch } from "../store/gptSlice";
import gptIcon from "../assets/gpt-search.png";
import { FaSignOutAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)
    const { showGPTButton } = useSelector(store => store.gptsearch);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        })
    }, [])

    const handleSignOut = () => {
        signOut(auth).then(() => { })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleGptSearch = () => {
        dispatch(toggleGptSearch());
        navigate(!showGPTButton ? "gpt-search" : -1);
    }

    return (
        <header className={`px-8 md:px-20 bg-transparent absolute top-0 ${user && "bg-black"}  flex items-center justify-between`}>
            <img className={`w-6/12 lg:w-2/12 py-4 ${user && "w-[35%] md:w-3/12"}`} src={NETFLIX_LOGO} alt="Netflix Logo" />
            {user && <nav className="flex items-center gap-3 md:gap-8">
                <button onClick={() => handleGptSearch()} className=" text-white font-semibold text-md md:text-xl px-2 md:px-4 md:py-2  cursor-pointer z-10">
                    {!showGPTButton ? <img className="w-8 md:hidden" src={gptIcon} alt="GPT Search" /> : <IoCloseSharp className="text-2xl bg-red-600 rounded-md lg:hidden" />}
                    <span className="hidden lg:block px-4 py-2 text-xl bg-purple-600 rounded-md">{showGPTButton ? "Close GPT" : "GPT Search"}</span>
                </button>
                <img className="w-8 rounded-full mr-1 md:mr-2" src={user.photoURL} />
                <button onClick={() => handleSignOut()} className="text-white font-semibold md:text-xl bg-red-600 px-2 md:px-4 py-1 md:py-2 rounded-md cursor-pointer"><FaSignOutAlt /></button>
            </nav>}
        </header>

    );
}

export default Header;
