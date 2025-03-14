import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/50fcc930-ba3f-4cae-9257-9f920e30a998/web/IN-en-20250310-TRIFECTA-perspective_739387a0-ff14-44ed-a5af-36e5aa4d236e_large.jpg' alt='img' />
            </div>
            <form className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                { !isSignInForm && <input type='text' placeholder='Name' className='p-4 my-4 w-full bg-gray-500' />}
                <input type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-500' />
                <input type='text' placeholder='Password' className='p-4 my-4 w-full bg-gray-500' />
                <button className='p-4 my-4 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{!isSignInForm ? "Already a User! Sign In Now" : "Are you new to Netflix? Sign Up Now!"}</p>
            </form>
        </div>
    );
};

export default Login;