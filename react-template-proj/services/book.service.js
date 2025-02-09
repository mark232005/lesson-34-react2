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

function get(carId) {
    return storageService.get(BOOK_KEY, carId)
}

function remove(carId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(BOOK_KEY, car)
    } else {
        return storageService.post(BOOK_KEY, car)
    }
}

function getEmptyBook(title = '', price = '') {
    return { title, price }
}

function getDefaultFilter() {
    return { title: '', price: '' }
}

// function _createBooks() {
//     let books = loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         books = [
//             _createBook('metus hendrerit', 109),
//             _createBook('A Little Life', 20),
//             _createBook('Rich Dad Poor Dad', 16),
//         ]
//         saveToStorage(BOOK_KEY, books)
//     }
// }

// function _createBooks() {
//     let booksFromStr = loadFromStorage(BOOK_KEY)

//     const ctgs = [
//       'Love',
//       'Fiction',
//       'Poetry',
//       'Computers',
//       'Religion'
//     ];
//     if (!booksFromStr || !booksFromStr.length) {

//     const books = [];

//     for (let i = 0; i < 20; i++) {
//       const book = {
//         id:makeId(),
//         title: makeLorem(2),
//         subtitle: makeLorem(4),
//         authors: [makeLorem(1)],
//         publishedDate:getRandomIntInclusive(1950, 2024),
//         description: makeLorem(20),
//         pageCount: getRandomIntInclusive(20, 600),
//         categories: [
//           ctgs[getRandomIntInclusive(0, ctgs.length - 1)]
//         ],
//         thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
//         language: "en",
//         listPrice: {
//           amount: xgetRandomIntInclusive(80, 500),
//           currencyCode: "EUR",
//           isOnSale: Math.random() > 0.7
//         }
//       };

//       books.push(book);
//     }}
//     saveToStorage(BOOK_KEY, booksFromStr)

//   }


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
        listPrice: {
            amount: getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
    return book
}

// function _createBook(title, price = 250) {
//     const book = getEmptyBook(title, price)
//     book.id = makeId()
//     book.listPrice={
//         amount:book.price,
//         currencyCode:'EUR',
//         isOnSale:false

//     }
//     return book
// }