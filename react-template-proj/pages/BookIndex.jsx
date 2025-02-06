import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookIndex() {
    const [books, setBook] = useState(null)
    useEffect(() => {
        bookService.query().then(
            books => {
                setBook(books)
            }
        )
    }, [])
    if(!books) return 'Loading'
    return (
        
        <BookList books={books}/>
    )
}