
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    console.log(user)
 
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (updateUser) => {
        return updateProfile(auth.currentUser, updateUser)
    }
     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
       
        })
        return () => {
            unsubscribe();
        }
    }, [])
    const userInfo = {
        loginUser,
        registerUser,
        user,
        setUser,
        updateUserProfile
    }
    return (
       <AuthContext value={userInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;