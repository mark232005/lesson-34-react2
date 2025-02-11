import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React


export function BookDetails({ bookId, onSelected }) {
    const [currBook, setCurrBook] = useState(null)
    useEffect(() => {
        loadBook()
    }, [bookId])

    function colorPrice() {
        if (currBook.listPrice.amount > 150) return 'red'
        if (currBook.listPrice.amount < 20) return 'green'
    }
    function publishedDate() {
        if (!currBook) return ''
        let nowData = new Date()
        let nowYear = nowData.getFullYear()

        if (nowYear - currBook.publishedDate > 10) return '(Vintage)'
        else {
            return '(New)'
        }
    }
    function pageCount() {
        if (currBook.pageCount > 500) return '(Serious Reading)'
        if (currBook.pageCount > 200) return '(Descent Reading)'
        if (currBook.pageCount < 100) return '(Light Reading)'
    }
    function onSale(){
        if (currBook.listPrice.isOnSale) return <button className='green'>Buy Now</button>
        else return  <p className='red'>sold out</p>
        
    }
    function loadBook() {
        bookService.get(bookId)
            .then(book => setCurrBook(book))
    }
    if (!currBook) return null
    return (
        <section className="book-details">
            <h2>Title: {currBook.title}</h2>
            <ul className="clean-list">
                <li>Subtitle: {currBook.subtitle}</li>
                <li>Authors: {currBook.authors}</li>
                <li>Language: {currBook.language}</li>
                <li>Page count: {currBook.pageCount}<span> {pageCount()}</span></li>
                <li>Published: {currBook.publishedDate} <span>{publishedDate()}</span></li>
                <li>Description: {currBook.description}</li>
                <li >Price: <span className={colorPrice()} >{currBook.listPrice.amount}$</span></li>
                <img src={currBook.thumbnail} />
                {onSale()}
                <button onClick={() => onSelected(null)}>back</button>

            </ul>
        </section>
    )
}
