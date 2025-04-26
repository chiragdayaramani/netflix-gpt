import React, { use, useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";

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
        onAuthStateChanged(auth, (user) => {
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
    },[])
  
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img
        className='w-44'
        src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo' />

    { user && <div className='flex'>
      <img className='w-14 h-14 p-2' src={user.photoURL} alt='user logo'/>      
      <button className='font-bold text-white' onClick={handleSignOut} > (Sign Out)</button>
    </div>}
    </div>
    
  ) 
}

export default Header