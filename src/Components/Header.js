// import { NETFLIX_LOGO } from "../utils/constant";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../store/userSlice";
import { NETFLIX_LOGO} from "../utils/constant";
import { toggleGptSearch } from "../store/gptSlice";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)

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
        signOut(auth).then(() => {})
        .catch((error) => {
            console.log(error);
        });
    }

    const handleGptSearch = () => {
        dispatch(toggleGptSearch());
    }

    return (
        <header className="absolute px-20 py-4 bg-gradient-to-b from-black flex justify-between">
            <img className={`w-2/12 ${user && "w-[10%]"}`} src={NETFLIX_LOGO} alt="Netflix Logo" />
            {user && <nav className="flex items-center gap-8">
                <button onClick={()=> handleGptSearch()} className="text-white font-semibold text-xl bg-purple-600 px-4 py-2 rounded-md">Search</button>
                <img className="w-8 rounded-full" src={user.photoURL} />
                <button onClick={() => handleSignOut()} className="text-white font-semibold text-xl bg-red-600 px-4 py-2 rounded-md">Sign out</button>
            </nav>}
        </header>

    );
}

export default Header;
