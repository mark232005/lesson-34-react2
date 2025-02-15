


export function ReviewPreview({review,onRemoveReview}){
    return(
<section>
    <h4>{review.fullName}</h4>
    <h6>{review.date}</h6>
    <h5>{review.star}</h5>
    <p>{review.txt}</p>
    <button onClick={()=>onRemoveReview(review.id)}>x</button>
</section>
    )
}