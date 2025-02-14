import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React

export function BookIndex() {
    const [books, setBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    useEffect(() => {
        loadBook()
    }, [filterBy])
    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }
    function loadBook() {
        bookService.query(filterBy).then(
            books => {
                setBook(books)
            }
        )
    }
    function onRemove(bookId) {
        bookService.remove(bookId).then(
            setBook(books => books.filter(book => book.id !== bookId)
            )
        )
        showSuccessMsg('Book Removed')

    }
    if (!books) return 'Loading...'
    return (
        <section>
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <BookList books={books} onRemove={onRemove} />
        </section>
    )
}