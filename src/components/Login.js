import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkVallidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const [errorMessage,setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick =() =>{
        //Validate Form Data

        //console.log(email);
       // console.log(password);
        const message = checkVallidData(email.current.value,password.current.value);
        //console.log(message);
        setErrorMessage(message);
        if(message) return;

        //Signin or SignUp
    
        if(!isSignInForm){
            //SignUp Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;

              updateProfile(user,{
                displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/68194613?v=4"
              }).then(()=>{
                const {uid, email, displayName, photoURL }= auth;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                console.log(user);
                navigate("/browse");

              }).catch((error)=>{
                setErrorMessage(error)
              });

            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              setErrorMessage(errorCode + '-' + errorMessage);
            });

        
        }
        else{
            //Signin Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate("/browse");
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + '-' + errorMessage);
            });
        }
        

    };
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/50fcc930-ba3f-4cae-9257-9f920e30a998/web/IN-en-20250310-TRIFECTA-perspective_739387a0-ff14-44ed-a5af-36e5aa4d236e_large.jpg' alt='img' />
            </div>
            <form onSubmit={(e)=>e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                { !isSignInForm && <input ref={name} type='text' placeholder='Name' className='p-4 my-4 w-full bg-gray-500' />}
                <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-500' />
                <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-500' />
                <p className='text-red-500'>{errorMessage}</p>
                <button className='p-4 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{!isSignInForm ? "Already a User! Sign In Now" : "Are you new to Netflix? Sign Up Now!"}</p>
            </form>
        </div>
    );
};

export default Login;