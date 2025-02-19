import { loadFromStorage, makeId, saveToStorage, makeLorem, getRandomIntInclusive } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getBookFromGoogle,
    addGoogleBook
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            else if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        console.log('in service saved');
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = '') {
    return { title, price }
}

function getDefaultFilter() {
    return { title: '', price: '' }
}



function _createBooks() {
    let booksF = loadFromStorage(BOOK_KEY)
    if (!booksF || !booksF.length) {

        const books = []
        for (let i = 0; i < 20; i++) {
            const book = _createBook(i)
            books.push(book)

        }
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(i) {
    const book = {
        id: makeId(),
        title: makeLorem(2),
        subtitle: makeLorem(4),
        authors: [makeLorem(1)],
        publishedDate: getRandomIntInclusive(1950, 2024),
        description: makeLorem(20),
        pageCount: getRandomIntInclusive(20, 600),
        thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
        language: "en",
        reviews: [],
        listPrice: {
            amount: getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
    return book
}

function addGoogleBook(book) {
    return storageService.post(BOOK_KEY, book)
}
function getBookFromGoogle(bookName) {
    if(bookName==='') return Promise.resolve()
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(url).then(res => {
        const data = res.data.items
        const books = _formatGoogleBooks(data)
        return books
    }
    )

}

function _formatGoogleBooks(googleBooks) {
    return googleBooks.map(googleBook => {
        const { volumeInfo } = googleBook
        const book = {
            id: googleBook.id,
            title: volumeInfo.title,
            subtitle: volumeInfo.subtitle,
            authors: volumeInfo.authors,
            publishedDate: volumeInfo.publishedDate,
            description: volumeInfo.description,
            pageCount: volumeInfo.pageCount,
            thumbnail: volumeInfo.imageLinks.thumbnail,
            language: volumeInfo.language,
            reviews: [],
            listPrice: {
                amount: getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        return book
    })
}