import { AddReview } from "../cmps/AddReview.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { bookService } from "../services/book.service.js"
import { reviewService } from "../services/review.service.js"

const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM


export function BookDetails() {
    const params = useParams()
    const [currBook, setCurrBook] = useState(null)
    const [isShowReviewModal, setisShowReviewModal] = useState(false)
    const [isShowReviewList, setIsShowReviewList] = useState(true)
    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {

        bookService.get(params.bookId)
            .then(book => setCurrBook(book))
    }
    function colorPrice() {
        if (currBook.listPrice.amount > 150) return 'red'
        if (currBook.listPrice.amount < 20) return 'green'
    }
    function publishedDate() {
        if (!currBook) return ''
        let nowData = new Date()
        let nowYear = nowData.getFullYear()

        if (nowYear - currBook.publishedDate > 10) return '(Vintage)'
        else {
            return '(New)'
        }
    }
    function pageCount() {
        if (currBook.pageCount > 500) return '(Serious Reading)'
        if (currBook.pageCount > 200) return '(Descent Reading)'
        if (currBook.pageCount < 100) return '(Light Reading)'
    }
    function onSale() {
        if (currBook.listPrice.isOnSale) return <button className='green'>Buy Now</button>
        else return <p className='red'>sold out</p>

    }

    function onToggleReviewModal() {
        setisShowReviewModal((prevIsReviewModal) => !prevIsReviewModal)
    }
    function onSaveReview(reviewToAdd) {
        reviewService.saveReview(params.bookId, reviewToAdd).then(review =>
            setCurrBook(prevBook => {
                const reviews = [review, ...prevBook.reviews]
                return { ...prevBook, reviews }
            })
        )
        setIsShowReviewList(true)
    }
    function onRemoveReview(id) {
        reviewService.removeReview(params.bookId, id)
        .then(() => {
            setCurrBook(prevBook => {
                const filteredReviews = prevBook.reviews.filter(review => review.id !==id)
                return { ...prevBook, reviews: filteredReviews }
            })
        })
    }

    if (!currBook) return 'Erore'
    return (
        <section className="book-details">
            <h2>Title: {currBook.title}</h2>
            <ul className="clean-list">
                <li>Subtitle: {currBook.subtitle}</li>
                <li>Authors: {currBook.authors}</li>
                <li>Language: {currBook.language}</li>
                <li>Page count: {currBook.pageCount}<span> {pageCount()}</span></li>
                <li>Published: {currBook.publishedDate} <span>{publishedDate()}</span></li>
                <li>Description: {currBook.description}</li>
                <li >Price: <span className={colorPrice()} >{currBook.listPrice.amount}$</span></li>
                <img src={currBook.thumbnail} />
                {onSale()}
                <button > <Link to={'/book'}>back</Link></button>
                <button onClick={() => onToggleReviewModal()}>Add Review </button>
                {isShowReviewModal && (
                    <AddReview
                        toggleReview={onToggleReviewModal}
                        onSaveReview={onSaveReview} />
                )}
                {isShowReviewList &&
                    <ReviewList
                        reviews={currBook.reviews}
                        onRemoveReview={onRemoveReview}
                    />

                }
            </ul>
        </section>
    )
}
