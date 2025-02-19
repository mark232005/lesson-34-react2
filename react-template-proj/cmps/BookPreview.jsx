const { Link } = ReactRouterDOM

export function BookPreview({ book,onRemove}) {
    const { amount } = book.listPrice
    const { title } = book
    const { thumbnail } = book
    return (
        <section className="book-preview">
            <h2>{title}</h2>
            <img src={thumbnail} />
            <p>{amount}$</p>
            <button> <Link to={`/book/${book.id}`}>Details</Link></button>
            <button><Link to={`/book/bookEdit/${book.id}`}>Edit </Link></button>
            <button onClick={()=>onRemove(book.id)}>x</button>
        </section>
    )
}