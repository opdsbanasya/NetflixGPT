// import { NETFLIX_LOGO } from "../utils/constant";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../store/userSlice";
import { USER_ICON } from "../utils/constant";

const Header = ({ isBrowse }) => {

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


    return (
        <header className="absolute px-20 py-4 bg-gradient-to-b from-black flex justify-between">
            <img className={`w-2/12 ${user && "w-[10%]"}`} src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="Nrtflix Logo" />
            {user && <nav className="flex items-center gap-5">
                <h3 className="text-white font-semibold">Search</h3>
                <img className="w-8 rounded-full" src={user.photoURL ? user.photoURL : USER_ICON} />
                <button onClick={() => handleSignOut()} className="text-white font-semibold bg-red-600 px-2 py-1 rounded-md">Sign out</button>
            </nav>}
        </header>

    );
}

export default Header;
