import {useState} from "react";
import {loginUser} from "../firebase/auth.js";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const[userEmail, setUserEmail] = useState("");
    const[userPassword, setUserPassword] = useState("");

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        if(userPassword.length<6){
            alert("Password must be at least 6 characters");
        }
        alert("User and pass is: " + userEmail + " " + userPassword);
        await loginUser(userEmail, userPassword);
        sessionStorage.setItem("userEmail", userEmail);
        sessionStorage.setItem("userPassword", userPassword);
        setUserEmail("");
        setUserPassword("");
        navigate("/");
    };


    return(
        <>
            <form onSubmit={handleFormSubmit}>
                <p>
                    <input type={"email"} onChange={handleEmailChange} value={userEmail} placeholder="Email" required={true}/>
                </p>
                <p>
                    <input type={"password"} onChange={handlePasswordChange} value={userPassword} placeholder="Password" required={true}/>
                </p>
                <input type={'submit'} value={"Login"}/>
            </form>
        </>
    )
}