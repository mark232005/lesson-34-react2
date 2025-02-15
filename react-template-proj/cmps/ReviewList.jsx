import { ReviewPreview } from "./ReviewPreview.jsx";




export function ReviewList({ reviews ,onRemoveReview}) {
    return (
        <section className='reviewc-list'>
            <h4>Users recommend:</h4>

            {reviews.map(review => {
                return (
                    <ReviewPreview
                        review={review}
                        onRemoveReview={onRemoveReview}
                    />

                )
            }
            )}

        </section>
    )
}