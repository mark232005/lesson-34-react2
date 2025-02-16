import { bookService } from "../services/book.service.js"
import { GoogleList } from "./GoogleList.jsx"

const { Link, NavLink } = ReactRouterDOM

const { useState, useEffect } = React
export function GoogleSearch() {
    const [search, setSearch] = useState('')
    const [bookList, setBookList] = useState([])
    useEffect(
        () => {
            if (search) {
                handleSearch(search)
            }
        }, [search]
    )
    function handleSearch(search) {
        bookService.getBookFromGoogle(search).then(books =>
            setBookList(books)
        )
    }
    function handleChange({ target }) {
        const { value } = target
        setSearch(value)
    }
    function onSave(book){
bookService.addGoogleBook(book)
    }
    return (
        <section>
            <label htmlFor="google-search">Search:</label>
            <input type="text" id="google-search" name="google-search" onChange={handleChange} />
            <button>Search</button>
            <GoogleList books={bookList} save={onSave} />
        </section>
    )
}