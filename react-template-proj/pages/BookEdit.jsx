import { GoogleSearch } from "../cmps/GoogleSearch.jsx";
import { bookService } from "../services/book.service.js";

const { useParams ,useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function BookEdit() {

    const [book, setBook] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        loadBook(bookId)
    }, [bookId])

    
    function loadBook(bookId) {
        bookService.get(bookId).then(setBook)
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        console.log('saved');
        bookService.save(book).then(()=>{
            console.log('book:', book);
            // UserMsg('Book saved sucessfully')
            //console.log('navigat:', navigate);
            navigate('/book')
        })
     .catch(err => console.log('Could not save book',err))
    }

    function handlehange({ target }) {
      
        setBook({ ...book, [target.name]: target.value})
    }

    function handlListPrice({ target }) {
        
        const {type} = target

       let {value} = target

       switch( type ) {
        case 'number':
            value = +value
        break;
        case 'checkbox':
value = target.checked
        break;
       }
        


        setBook((prevBook) => ({
            ...prevBook, listPrice: {
                ...prevBook.listPrice, [target.name]: target.value
            }
        }))
    }


    if (!book) return
  
    return (
        <section>
            <h4>Edit book:</h4>
            <GoogleSearch />
            <form onSubmit={(event) => onSaveBook(event)} >
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" value={book.title} onChange={handlehange} />

                <label htmlFor="authors">Authors:</label>
                <input type="text" name="authors" id="authors" value={book.authors} onChange={handlehange} />

                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" value={book.description} onChange={handlehange} />

                <label htmlFor="pageCount">Number of pages:</label>
                <input type="number" name="pageCount" id="pageCount" value={book.pageCount} onChange={handlehange} />

                <label htmlFor="amount">Price:</label>
                <input type="number" name="amount" id="amount" value={book.listPrice.amount} onChange={handlListPrice} />

                <label htmlFor="isOnSale">On sale:</label>
                <input type="checkBox" name="isOnSale" id="isOnSale" checked={book.listPrice.isOnSale} onChange={handlListPrice} />
                <button>Save</button>
            </form>

        </section>
    )
}