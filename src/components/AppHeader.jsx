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
                <Link to={"/"} className="App-header__logo"><img src={"../src/assets/logo2.png"}  alt={"an image of todo-list logo"}/></Link>
                <br/>
                <div className="App-header__links">
                    {
                        sessionStorage.getItem('userEmail')?
                            <div><Link to={"#"} className={'linkItem'}>Hello {sessionStorage.getItem('userEmail')}</Link></div>:
                            <div></div>
                    }

                    <Link to={'/signup'} className={'linkItem'}>Sign Up</Link>
                    <Link to={'/login'} className={'linkItem'}>Login</Link>
                    <Link onClick={handleLogout} className={'linkItem'} to={"#"}>Logout</Link>
                </div>

            </header>
        </>
    )
}