
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext(null)
const provider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(user)
    
 
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (updateUser) => {
        setLoading(true)
        return updateProfile(auth.currentUser, updateUser)
    }
    const signInGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const signInGithub = () => {
        setLoading(true)
        return signInWithPopup(auth, GithubProvider)
    }
    const logoutUser = () => {
        return signOut(auth)
    }
     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        setLoading(false)
       
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
        updateUserProfile,
        signInGoogle,
        signInGithub,
        logoutUser,
        loading 
    }
    return (
       <AuthContext value={userInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;