import { Book } from './book';
import * as fs from 'fs';

const RANDOM_REFERENCE_COUNT = 25;
const RANDOM_BORROWED_COUNT = 5;

function generateRandomNumbersArray(
  amount = 0,
  max = 10,
  excludedIndexes = [],
) {
  if (!amount) {
    return [];
  }

  const numbers: Set<number> = new Set();
  const excluded: Set<number> = new Set(excludedIndexes);

  while (numbers.size < amount) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    if (!excluded.has(randomNumber)) {
      numbers.add(randomNumber);
    }
  }

  return [...numbers];
}

interface BookCounts {
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
}
