import {useState} from "react";
import {createNewUser} from "../firebase/auth.js";
import '/src/assets/Tasks.css';
import {useNavigate} from "react-router-dom";

export default function Signup(){
    const[userEmail, setUserEmail] = useState("");
    const[userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

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
        await createNewUser(userEmail, userPassword);
        navigate("/login");
        setUserEmail("");
        setUserPassword("");

    };


    return(
        <>
            <form onSubmit={handleFormSubmit} className={'formArea'}>
                <p>
                    <input type={"email"} onChange={handleEmailChange} value={userEmail} placeholder="Email" required={true} className={'inputText'}/>
                </p>
                <p>
                    <input type={"password"} onChange={handlePasswordChange} value={userPassword} placeholder="Password" required={true} className={'inputText'}/>
                </p>
                <input type={'submit'} value={"Sign Up"} className={"task_addbutton"}/>
            </form>

        </>
    )
}