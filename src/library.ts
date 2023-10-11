import { Book } from './book';
import * as fs from 'fs';

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
}
