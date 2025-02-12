const { Link, NavLink } = ReactRouterDOM



export function AppHeader() {
    return (
        <header className="app-header main-layout flex">
            <h1>My Books</h1>
            <nav className=" nav-bar flex">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book">Books</NavLink>
            </nav>
        </header>

    )
}