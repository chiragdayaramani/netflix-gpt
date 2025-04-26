import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from '../utils/constants';

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      
      // navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }

      //want to render only once to useEffect
      useEffect(()=>{
        //returns a unsubscribe function to call after useEffect -- clean up process
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user

                const {uid, email, displayName, photoURL }= user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
               navigate("/browse");
        
            } else {
              // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
          });
          //unsubscribe when component unmounts
          return () => unsubscribe();
    },[])
  
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img
        className='w-44'
        src={LOGO} alt='logo' />

    { user && <div className='flex'>
      <img className='w-14 h-14 p-2' src={user.photoURL} alt='user logo'/>      
      <button className='font-bold text-white' onClick={handleSignOut} > (Sign Out)</button>
    </div>}
    </div>
    
  ) 
}

export default Header