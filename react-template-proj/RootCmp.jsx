import { AboutUs } from "./pages/AboutUs.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"
const {useState}=React
export function App() {
    const [page,setPage] = useState('home')
    function onSetPage(page){
        setPage(page)
    }
    return (
        <section className="app">
            <AppHeader onSetPage={onSetPage}/>
            <main className="main-layout">
             {page==='home'&& <Home />}
             {page==='aboutUs'&& <AboutUs/>}
             {page==='bookIndex'&& <BookIndex/>}
            </main>
        </section>
    )
}