"use client";
import { useRef, useState } from "react";
import { MAIN_BG_IMG, RULES, USER_ICON } from "../utils/constant";
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
    const [showRules, setshowRules] = useState(true)

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleFormType = () => {
        setFormType(formType === "signin" && "signup" || formType === "signup" && "signin")
        setErrorMessage(null);
        email.current.value = "";
        password.current.value = "";
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
        <section className="relative">
            <Header />
            <div className="h-screen w-full overflow-hidden">
                <img src={MAIN_BG_IMG} className="w-full h-full object-cover object-center" alt="bg-img" />
            </div>
            <div className="w-[90%] md:w-[65%] lg:w-[32%] absolute text-white top-[45%] left-1/2 -translate-x-1/2 -translate-y-[45%] glass-card p-8 md:p-14 space-y-8 animate-fade-in-up">
                <h2 className="text-3xl font-bold tracking-wide">{formType === "signin" ? "Sign In" : "Sign Up"}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-6">
                    {formType === "signup" && (
                        <div className="w-full space-y-1 relative">
                            <input ref={name} className="w-full glass-input px-5 py-4 rounded-lg" type="text" placeholder="Full Name" required />
                            {errorMessage?.nameResult && <p className="absolute text-red-500 text-xs mt-1">{errorMessage.nameResult}</p>}
                            {showRules && !errorMessage?.nameResult && <p className="text-xs text-white/50 ml-1 mt-1">{RULES?.name}</p>}
                        </div> 
                    )}
                    <div className="w-full space-y-1 relative">
                        <input ref={email} className="w-full glass-input px-5 py-4 rounded-lg" type="email" placeholder="Email Address" required />
                        {errorMessage?.emailResult && <p className="absolute text-red-500 text-xs mt-1">{errorMessage.emailResult}</p>}
                    </div>
                    <div className="w-full space-y-1 relative">
                        <input ref={password} className="w-full glass-input px-5 py-4 rounded-lg" type="password" placeholder="Password" required />
                        {errorMessage?.passwordResult && <p className="absolute text-red-500 text-xs mt-1">{errorMessage.passwordResult}</p>}
                        {showRules && formType === "signup" && !errorMessage?.nameResult && RULES?.password.map((rule, index)=> <p key={index} className="text-xs list-item ml-5 text-white/50">{rule}</p>)}
                    </div>
                    <button type="submit" className="w-full py-4 text-white rounded-lg font-semibold bg-netflix-red hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30 text-lg mt-4">
                        {formType === "signin" ? "Sign In" : "Sign Up"}
                    </button>
                </form>
                <div className="text-white/70 font-medium">
                    {formType === "signin" ? "New to Netflix?" : "Already have an account?"}{" "}
                    <span onClick={() => handleFormType()} className="text-white font-semibold hover:underline cursor-pointer transition-all">
                        Sign {formType === "signin" ? "up" : "in"} now.
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Login;
