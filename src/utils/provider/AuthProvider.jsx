// {**😍😍firebase must be installed if not installed will not work😍😍 **}

// import {createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import PropTypes from 'prop-types';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { createContext } from 'react';
// import auth from "../firebaseConfig/FirebaseConfig";


// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//     const [user, setUser] =useState(null);
//     //loading spanner
//     const [loading, setLoading] =useState(true);

//     //CREATE AUTH
//     const signUp = (email,password) =>{
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);
//     };
//     // LOGIN AUTH
//     const signIn = (email, password)=>{
//         setLoading(true);
//         return signInWithEmailAndPassword(auth,email,password)
//     }
  
//    //  google login
//    const signInWithGoogle =(googleProvider)=>{
//     setLoading(true)
//     return signInWithPopup(auth, googleProvider)
//    }

//    const logOut = () =>{
//     setLoading(true);
//     return signOut(auth);
//    }

//    useEffect(()=>{
//     const unSubscribe = onAuthStateChanged(auth, currentUser =>{
//         console.log('user state change', currentUser);
//         setUser(currentUser);
//         setLoading(false);
//     });
//     return () =>{
//         unSubscribe
//     }
//    },[]);

//     const authInfo = {
//      user,
//      signUp,
//      signIn,
//      signInWithGoogle,
//      logOut,
//      loading,
     
//     }

//     return (
//        <AuthContext.Provider value={authInfo}>
//         {children}
//        </AuthContext.Provider>
     
//     );
// };

// export default AuthProvider;

// //propstype off
// AuthProvider.propTypes ={
//     children:PropTypes.node
// }

