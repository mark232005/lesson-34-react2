import { BookPreview } from "./BookPreview.jsx";



export function BookList({ books,onSelected}) {
  return (
    <section>
      <h2>Book List:</h2>
      <ul className='clean-list grid book-list'>
        {books.map(book =>
          <li key={book.id}>
            <BookPreview book={book} selectedBook={onSelected} />
          </li>
        )}
      </ul>
    </section>

  )
}