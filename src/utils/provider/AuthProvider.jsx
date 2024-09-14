// {**😍😍firebase must be installed if not installed will not work😍😍 **}

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebaseConfig/FirebaseConfig';



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] =useState(null);
    //loading spanner
    const [loading, setLoading] =useState(false);

    //CREATE AUTH
    const signUp = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
        .finally(() => setLoading(false)); //সফল বা ব্যর্থ হলে, .finally() কল করে loading-কে false করা হবে, যাতে বাটন আবার সক্রিয় হয় এবং স্পিনার বন্ধ হয়।
    };
    // LOGIN AUTH
    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
        .finally(() => setLoading(false)); 
    }
  
   //  google login
   const signInWithGoogle =(googleProvider)=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
   }

   const logOut = () =>{
    setLoading(true);
    return signOut(auth);
   }

   const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
    });
   }

   useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, currentUser =>{
        console.log('user state change', currentUser);
        setUser(currentUser);
        setLoading(false);
    });
    return () =>{
        unSubscribe();
    }
   },[]);

    const authInfo = {
     user,
     setUser,
     signUp,
     signIn,
     signInWithGoogle,
     logOut,
     updateUserProfile,
     loading
     
    }

    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
     
    );
};

export default AuthProvider;

//propstype off
AuthProvider.propTypes ={
    children:PropTypes.node
}

