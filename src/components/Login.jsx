import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constant';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;

        // singIn / signUp
        if (!isSignInForm) {
            // signUp logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                    }).then(() => {
                        // Profile updated!
                        console.log(user);
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });

        } else {
            // signIn logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("Sign In:-", user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4263c437-c678-4724-ad80-e3ba0dc8761e/web/IN-en-20260921-TRIFECTA-perspective_95810136-2c4a-4ab4-a323-50418521e261_large.jpg" alt="" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 my-36 bg-black/80 text-white mx-auto right-0 left-0">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                {
                    !isSignInForm && <input
                        type="text"
                        ref={name}
                        placeholder="Full Name"
                        className="px-4 py-3 my-3 w-full bg-gray-700 text-black rounded-lg"
                    />
                }
                <input
                    type="text"
                    ref={email}
                    placeholder="Email Address"
                    className="px-4 py-3 my-3 w-full bg-gray-700 text-black rounded-lg"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="px-4 py-3 my-3 w-full bg-gray-700 text-black rounded-lg"
                />
                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
                <button className="px-4 py-3 my-6 bg-red-700 rounded-lg w-full" onClick={handleButtonClick}>
                    {isSignInForm ? 'Sign In' : 'Sign Up'}
                </button>
                <p className='py-4' onClick={toggleSignInForm}>
                    {isSignInForm ? 'New to Netflix? Sign Up Now' : 'Already registered? Sign In Now.'}
                </p>
            </form>
        </div>
    )
}

export default Login;