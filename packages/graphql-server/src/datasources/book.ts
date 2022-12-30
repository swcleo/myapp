import {
  AddBookMutationResponse,
  Book,
} from "../__generated__/resolvers-types";

export class BookAPI {
  books: { title?: string; author?: string }[] = [
    {
      title: "The Awakening",
      author: "Kate Chopin",
    },
    {
      title: "City of Glass",
      author: "Paul Auster",
    },
  ];

  getBooks(): Book[] {
    return this.books;
  }

  async addBook(book: Book): Promise<AddBookMutationResponse> {
    this.books.push(book);

    return {
      code: "200",
      success: true,
      message: "New book added!",
      book: this.books[this.books.length - 1],
    };
  }
}
