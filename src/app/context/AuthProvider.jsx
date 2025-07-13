"use client";
import React, { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider, signInWithPopup
} from "firebase/auth";
import auth from "../../../lib/firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logInUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignUp = () => {
        setLoader(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };
    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser)
            setLoader(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loader,
        setUser,
        setLoader,
        createUser,
        googleSignUp,
        logInUser,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
