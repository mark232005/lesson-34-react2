


export function AppHeader({onSetPage}){
    return(
        <header className="app-header main-layout flex">
        <h1>My App</h1>
        <nav className=" nav-bar flex">
            <a className="home" onClick={()=>onSetPage('home')} href="#">Home</a>
            <a className="aboutUs" onClick={()=>onSetPage('aboutUs')} href="#">AboutUs</a>
            <a className="bookIndex"  onClick={()=>onSetPage('bookIndex')} href="#">BookIndex</a>
        </nav>
    </header>

    )
}