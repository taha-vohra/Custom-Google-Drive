export class Pagination_Helper {
  private currentPage: number;

  constructor(
    public pageSize: number,
    initialPage: number = 1
  ) {
    this.currentPage = initialPage;
  }

  public next() {
    this.currentPage += 1;
    return this.offset();
  }

  public previous() {
    this.currentPage = Math.max(1, this.currentPage - 1);
    return this.offset();
  }

  public offset() {
    return (this.currentPage - 1) * this.pageSize;
  }

  public page() {
    return this.currentPage;
  }
}