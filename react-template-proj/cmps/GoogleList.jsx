
export function GoogleList({ books, save }) {
    const { Link, NavLink } = ReactRouterDOM

    return (
        <section className="google-list">
            <ul>
                {books.map(book => {
                    return (
                        <li>
                            <h4>{book.title}</h4>
                            <button onClick={() => {
                                save(book)
                                { <Link to="/book"></Link> }
                            }}>+</button>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}