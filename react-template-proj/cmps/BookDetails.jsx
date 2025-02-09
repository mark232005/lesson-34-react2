

export function BookDetails({bookId,onSelected}){



    return(
        <section className="book-details">

            <h3>{bookId}</h3>
<button onClick={()=>onSelected(null)}>back</button>

        </section>
    )
}