import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookIndex() {
    const [books, setBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        loadBook()
    }, [filterBy])
    function onSelected(bookId) {
        setSelected(bookId)
    }
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
    if (!books) return 'Loading...'
    return (
        <section>
            {selected ?
                <BookDetails bookId={selected} onSelected={onSelected}/> :
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

                    <BookList books={books} onSelected={onSelected} />
                </React.Fragment>
            }
        </section>
    )
}