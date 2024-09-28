import { useRef, useState } from "react";
import { MAIN_BG_IMG, USER_ICON } from "../utils/constant";
import Header from "./Header";
import { formValidation } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Login = () => {

    const dispatch = useDispatch();

    const [formType, setFormType] = useState("signin");
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleFormType = () => {
        setFormType(formType === "signin" && "signup" || formType === "signup" && "signin")
        setErrorMessage(null);
    }

    const handleSubmit = () => {
        const message = formValidation(formType === "signup" && name.current.value, email.current.value, password.current.value);
        setErrorMessage(message);
        if (Object.keys(message).length !== 0) return;

        if (formType === "signup") {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: name.current.value,
                        photoURL: USER_ICON
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                    }).catch((error) => {
                        const errorCode = error.code;
                        const FireErrorMessage = error.message;
                        setErrorMessage({ signError: errorCode + " " + FireErrorMessage });
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const FireErrorMessage = error.message;
                    setErrorMessage({ signError: errorCode + " " + FireErrorMessage });
                    console.log(errorMessage.signError);
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const FireErrorMessage = error.message;
                    setErrorMessage(errorCode + " " + FireErrorMessage);
                    alert("Invalid User");
                });
        }
    }

    return (
        <section className="relative ">
            <Header />
            <div className="h-screen w-full overflow-hidden">
                <img src={MAIN_BG_IMG} className="w-full object-cover object-center" alt="bg-img" />
            </div>
            <div className="w-[32%] absolute text-white top-[38%] left-1/2 -translate-x-1/2 -translate-y-[38%] bg-black bg-opacity-85 py-10 px-16 space-y-10">
                <h2 className=" text-3xl font-semibold">{formType === "signin" ? "Sign in" : "Sign up"}</h2>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-10 ">
                    {formType === "signup" && <div className="w-full space-y-2">
                        <input ref={name} className="w-full px-4 py-4 text-white outline-none border border-gray-400 rounded-md bg-black bg-opacity-50" type="text" placeholder="Full name" required />
                        <p className="absolute text-red-500 text-xs">{errorMessage?.nameResult && errorMessage.nameResult}</p>
                    </div>
                    }
                    <div className="w-full space-y-2">
                        <input ref={email} className="w-full px-4 py-4 text-white outline-none border border-gray-400 rounded-md bg-black bg-opacity-50" type="email" placeholder="Email" />
                        <p className="absolute text-red-500 text-xs">{errorMessage?.emailResult && errorMessage.emailResult}</p>
                    </div>
                    <div className="w-full space-y-2">
                        <input ref={password} className="w-full px-4 py-4 text-white outline-none border border-gray-400 rounded-md bg-black bg-opacity-50" type="password" placeholder="Password" />
                        <p className="absolute text-red-500 text-xs">{errorMessage?.passwordResult && errorMessage.passwordResult}</p>
                    </div>
                    <input type="submit" onClick={() => handleSubmit()} value={formType === "signin" ? "Sign in" : "Sign up"} className="py-2 px-4 text-white rounded-md font-semibold bg-red-700 cursor-pointer" />
                </form>
                <h3>{formType === "signin" ? "New to Netflix?" : "Alraedy have account?"} <span onClick={() => handleFormType()} className="font-semibold hover:underline cursor-pointer">Sign {formType === "signin" ? "up" : "in"} now</span>.</h3>
            </div>
        </section>
    );
}

export default Login;
