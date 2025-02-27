import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import {app} from "./firebase.js";

const auth = getAuth(app);

const createNewUser = async (email, password)=>{
    let userCredentials;
    try{
        const firebaseCreateUser= await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign up successful");
        userCredentials = firebaseCreateUser.user;
    }
    catch(error){
        console.error(error);
    }
   return userCredentials;
};

const loginUser = async (email, password)=>{
    let userCredentials;
    try{
        const firebaseLoginUser= await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful");
        userCredentials = firebaseLoginUser.user;
        sessionStorage.setItem("userid", userCredentials.uid);
    }
    catch(error){
        console.error(error);
    }
    return userCredentials;
};

const signoutUser = async ()=>{
    try{
        await signOut(auth);
        alert("Sign out successful");
    }
    catch (e) {
        console.error(e);
    }
}
export {createNewUser, loginUser, signoutUser, auth};

