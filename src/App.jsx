import './App.css'
import AppHeader from "./components/AppHeader.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <>
        <Router>
            <AppHeader />
            <Routes>
                <Route path={'/signup'} element={<Signup/>}></Route>
                <Route path={'/login'} element={<Login/>}></Route>
                <Route path={'/'} element={<Home/>}></Route>
            </Routes>
        </Router>

    </>
  )
}

export default App
