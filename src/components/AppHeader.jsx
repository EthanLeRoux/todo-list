import '/src/assets/Tasks.css';

export default function AppHeader(){
    return (
        <>
            <header className="App-header">
                <a className="App-header__logo" href="/">
                    <h1>To-do</h1>
                </a>
                <br/>
                <div className="App-header__links">
                    <a href="/">
                        <h2>
                            Login
                        </h2>
                    </a>
                    <a href="/">
                        <h2>
                            Settings
                        </h2>
                    </a>
                </div>

            </header>
        </>
    )
}