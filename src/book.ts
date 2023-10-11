export class Book {
  constructor(
    public bookID: number,
    public title: string,
    public authors: string,
    public average_rating: number,
    public isbn: string,
    public isbn13: string,
    public language_code: string,
    public num_pages: number,
    public ratings_count: number,
    public text_reviews_count: number,
    public publication_date: string,
    public publisher: string,
    public isBorrowed = false,
    public isReference = false,
  ) {}
}
