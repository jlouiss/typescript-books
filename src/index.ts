import { Library } from './library';

const library = new Library('./src/data/books.json');
library.randomizeState();


console.log(
  'As a library user, I would like to be able to find books by my favourite author, so that I know if they are available in the library.',
);
const author = 'Rowling';
const booksByAuthor = library.findBooksByAuthor(author);
console.log(`Books by ${author}:`, booksByAuthor);
console.log('\n\n\n\n\n\n###\n###\n\n\n\n\n\n\n');


console.log(
  'As a library user, I would like to be able to find books by title, so that I know if they are available in the library.',
);
const title = 'Harry Potter';
const booksByTitle = library.findBooksByTitle(title);
console.log(`Books with Title containing '${title}':`, booksByTitle);
console.log('\n\n\n\n\n\n###\n###\n\n\n\n\n\n\n');


console.log(
  'As a library user, I would like to be able to find books by ISBN, so that I know if they are available in the library.',
);
const isbn = '0345453743';
const bookByISBN = library.findBookByISBN(isbn);
console.log(`Book with ISBN ${isbn}:`, bookByISBN);
console.log('\n\n\n\n\n\n###\n###\n\n\n\n\n\n\n');


console.log('Find by ISBN 13');
const isbn13 = '9780767903820';
const bookByISBN13 = library.findBookByISBN(isbn13);
console.log(`Book with ISBN ${isbn13}:`, bookByISBN13);
console.log('\n\n\n\n\n\n###\n###\n\n\n\n\n\n\n');


console.log(
  'As a library user, I would like to be able to borrow a book, so I can read it at home.',
);
const borrowIsbns = ['0618346252', '9780976694007', '0595321801', '0374522596'];
borrowIsbns.forEach((isbn) => {
  const borrowed = library.borrowBook(isbn);
  console.log(`Borrowed: ${isbn}`, borrowed);
});
console.log('\n\n\n\n\n\n###\n###\n\n\n\n\n\n\n');


console.log(
  'As the library owner, I would like to know how many books are being borrowed, so I can see how many are outstanding.',
);
const borrowedCount = library.getBorrowedBookCount();
console.log('Number of borrowed books:', borrowedCount);
console.log('\n\n\n\n\n\n###\n###\n\n\n\n\n\n\n');


console.log(
  'As a library user, I should be to prevented from borrowing reference books, so that they are always available.',
);
const referenceBook = library.getReferenceBooks()[0];
library.borrowBook(referenceBook.isbn);
console.log('\n\n\n\n\n\n###\n###\n\n\n\n\n\n\n');
