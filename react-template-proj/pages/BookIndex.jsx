import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookIndex() {
    const [books, setBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBook()
    }, [filterBy])

function onSetFilterBy(filterBy){
    setFilterBy({...filterBy})
}
    function loadBook() {
        bookService.query(filterBy).then(
            books => {
                setBook(books)
            }
        )
    }
    if (!books) return 'Loading...'
    return (
        <section>
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            <BookList books={books} />

        </section>
    )
}