import '/src/assets/Tasks.css';
import {Link, useNavigate} from "react-router-dom";
import {signoutUser} from "../firebase/auth.js";

export default function AppHeader(){
    const handleLogout = async ()=>{
        const logoutConfirm = confirm("Are you sure you want to logout?").valueOf();
        if(logoutConfirm === true){
            await signoutUser();
            sessionStorage.clear();
            window.location.reload();
        }
        else{
            console.log("Log out cancelled.")
        }
    };

    return (
        <>
            <header className="App-header">
                <Link to={"/"} className="App-header__logo"><h1>ToDo</h1></Link>
                <br/>
                <div className="App-header__links">
                    <Link to={'/signup'} className={'linkItem'}>Sign Up</Link>
                    <Link to={'/login'} className={'linkItem'}>Login</Link>
                    <Link onClick={handleLogout} className={'linkItem'} to={"#"}>Logout</Link>
                </div>

            </header>
        </>
    )
}