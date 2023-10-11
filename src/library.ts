import * as fs from 'fs';
import { Book } from './book';
import { generateRandomNumbersArray } from './utils';

const RANDOM_REFERENCE_COUNT = 25;
const RANDOM_BORROWED_COUNT = 5;

export interface BookCounts {
  availableCount: number;
  borrowedCount: number;
}

export class Library {
  private books: Book[] = [];

  constructor(private fileName = '') {
    if (fileName) {
      this.initializeLibraryFromFile();
    }
  }

  private initializeLibraryFromFile() {
    const data = fs.readFileSync(this.fileName, 'utf-8');
    this.books = JSON.parse(data);
  }

  // Set random books as reference and borrowed
  // Assumption: a reference book can never be borrowed, so
  // `randomizeReferenceBooks()` will always run before `randomizeBorrowedBooks()`
  randomizeState() {
    const maxIndex = this.books.length - 1;
    const referenceBookIndexes = generateRandomNumbersArray(
      RANDOM_REFERENCE_COUNT,
      maxIndex,
    );
    const borrowedBooksIndexes = generateRandomNumbersArray(
      RANDOM_BORROWED_COUNT,
      maxIndex,
    );
    this.randomizeReferenceBooks(referenceBookIndexes);
    this.randomizeBorrowedBooks(borrowedBooksIndexes);
  }

  private randomizeReferenceBooks(indexes: number[] = []) {
    if (indexes.length) {
      indexes.forEach((index) => {
        this.books[index].isReference = true;
      });
    }
  }

  private randomizeBorrowedBooks(indexes: number[] = []) {
    if (indexes.length) {
      indexes.forEach((index) => {
        this.books[index].isBorrowed = true;
      });
    }
  }

  findBooksByAuthor(author: string): Book[] {
    const query = author.toLowerCase();
    return this.books.filter((book) =>
      book.authors.toLowerCase().includes(query),
    );
  }

  findBooksByTitle(title: string): Book[] {
    const query = title.toLowerCase();
    return this.books.filter((book) =>
      book.title.toLowerCase().includes(query),
    );
  }

  findBookByISBN(isbn: string): Book | undefined {
    return this.books.find(
      (book) => book.isbn.includes(isbn) || book.isbn13.includes(isbn),
    );
  }

  borrowBook(isbn: string): Book | null {
    const book = this.findBookByISBN(isbn);
    if (book && !book.isReference) {
      book.isBorrowed = true;
      return book;
    }
    return null;
  }

  getBorrowedBooks(): Book[] {
    return this.books.filter((book) => book.isBorrowed);
  }

  getReferenceBooks(): Book[] {
    return this.books.filter((book) => book.isReference);
  }

  getBorrowedBookCount(): BookCounts {
    const borrowedCount = this.getBorrowedBooks().length;
    const availableCount = this.books.length - borrowedCount;
    return {
      availableCount,
      borrowedCount,
    };
  }
}
