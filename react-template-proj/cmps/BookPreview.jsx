
export function BookPreview({book}) {
    return (
        <section className="book-preview">
            <h2>{book.title}</h2>
            <p>{book.price}$</p>

        </section>
    )
}