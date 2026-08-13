"use client";

// import { NETFLIX_LOGO } from "../utils/constant";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
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

    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)
    const { showGPTButton } = useSelector(store => store.gptsearch);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                router.push("/browse");
            } else {
                dispatch(removeUser());
                router.push("/");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => { })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleGptSearch = () => {
        dispatch(toggleGptSearch());
        if (!showGPTButton) {
            router.push("gpt-search");
        } else {
            router.back();
        }
    }

    return (
        <header className={`px-8 md:px-20 fixed top-0 w-full z-50 transition-all duration-300 ${user ? "glass-navbar py-3" : "bg-transparent py-4"} flex items-center justify-between`}>
            <img className={`w-[120px] md:w-[150px] transition-all`} src={NETFLIX_LOGO} alt="Netflix Logo" />
            
            {user && <nav className="flex items-center gap-4 md:gap-6">
                <button onClick={() => handleGptSearch()} className="group flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium px-4 py-2 rounded-full glass-panel transition-all hover:bg-white/20">
                    {!showGPTButton ? (
                        <>
                            <img className="w-5 h-5 opacity-90 group-hover:opacity-100 transition-opacity" src={gptIcon.src} alt="GPT Search" />
                            <span className="hidden md:block">AI Search</span>
                        </>
                    ) : (
                        <>
                            <IoCloseSharp className="text-xl text-white/80 group-hover:text-white" />
                            <span className="hidden md:block">Close Search</span>
                        </>
                    )}
                </button>
                <div className="flex items-center gap-3 ml-2 border-l border-white/20 pl-4">
                    <img className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-sm" src={user.photoURL} alt="User profile" />
                    <button onClick={() => handleSignOut()} className="text-white/70 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-full transition-all" title="Sign out">
                        <FaSignOutAlt className="text-xl" />
                    </button>
                </div>
            </nav>}
        </header>

    );
}

export default Header;
