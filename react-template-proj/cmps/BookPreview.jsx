
export function BookPreview({book,selectedBook}) {
    const {amount}=book.listPrice
    const {title}=book
    const {thumbnail}=book
    return (
        <section className="book-preview">
            <h2>{title}</h2>
            <img src={thumbnail}/>
            <p>{amount}$</p>
<button onClick={()=>selectedBook(book.id)}>Details</button>
            <button>x</button>
        </section>
    )
}