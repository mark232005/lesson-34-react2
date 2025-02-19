import { reviewService } from "../services/review.service.js"

const { useState } = React

export function AddReview({ toggleReview, onSaveReview }) {

    const [toAddReview, setToAddReview] = useState(reviewService.getEmptyReview)

    function onSubmit(ev) {
        ev.preventDefault()
        onSaveReview(toAddReview)
        toggleReview()
    }
    function handleChange({ target }) {
        const { value, name: field ,type} = target
        console.log(type);
        if(type==='range'){
const star='⭐'.repeat(+value)
            setToAddReview(prevReview => ({ ...prevReview, star: star}))

        }
        setToAddReview(prevReview => ({ ...prevReview, [field]: value }))
    }
    const { fullName, rating, date, txt} = toAddReview
    return (
        <section>
            <form onSubmit={onSubmit}>
                <button onClick={() => toggleReview()}>x</button>
                <label htmlFor="user-name">Name:</label>
                <input type="text" id='user-name' name="fullName" value={fullName} onChange={handleChange} />

                <label htmlFor="rating">Rating:</label>
                <input type="range" max='5' min='1' id='rating' value={rating} name="rating" onChange={handleChange} />

                <label htmlFor="readAt"></label>
                <input type="date" id='readAt' name="date" value={date} onChange={handleChange} />

                <label htmlFor="txt"></label>
                <input type="text" id='txt' name="txt" value={txt} onChange={handleChange} />
                <button>Save</button>
            </form>
        </section>
    )
}