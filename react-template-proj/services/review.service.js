
import { bookService } from "./book.service.js"
import { makeId } from "./util.service.js"
export const reviewService = {
    saveReview,
    getEmptyReview,
    removeReview
}

function saveReview(id, reviewToSave) {
    return bookService.get(id).then(
        book => {
            if(!book.reviews) return []
            const review = __createReview(reviewToSave)
            book.reviews.unshift(review)
            return bookService.save(book).then(
                () => { 
                    return review 
                }
                
            )
        }
    )
}

function removeReview(bookId,reviewId){
    return bookService.get(bookId).then(book=>{
        const newReviews=book.reviews.filter(review=>review.id!==reviewId)
        book.reviews = newReviews
        return bookService.save(book)

    })
}
function getEmptyReview() {
    return {
        fullName: 'New name',
        rating: 0,
        date: new Date,
        txt: ''

    }
}

function __createReview(reviewToSave) {
    return {
        id: makeId(),
        ...reviewToSave
    }
}