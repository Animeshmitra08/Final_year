import { GoogleAuthProvider, RecaptchaVerifier, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase/firebase";
import { get, ref } from "firebase/database";

const userAuthContext = createContext();



export function UserAuthContextProvider({children}) {

    const [user, setUser] = useState({});
    const [adminUsersData, setAdminUsersData] = useState({name:"", isAuthenticated:false})


    function signUp(email,password){
        return createUserWithEmailAndPassword(auth, email, password);
    }


    function login(email,password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    

    function logout(){
        return signOut(auth);
    }

    function googleSign() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }


    function Adminlogout() {
        return setAdminUsersData({...adminUsersData, isAuthenticated:false})
    }

    





    useEffect(() => {
        // usercalling-------------------------------------------
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{            
            setUser(currentUser);
        });

        return ()=>{
            unsubscribe();
        }    
    }, []);


    const value = {
        user,
        signUp,
        login,
        logout,
        googleSign,
        resetPassword,
        adminUsersData,
        Adminlogout
    }
    




    return (<userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>)
}

export function useUserAuth(){
    return useContext(userAuthContext)
}