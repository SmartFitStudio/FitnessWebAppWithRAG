import { MessageHandler } from "../myServices/error-handler/MessageHandler";

export abstract class PaginatedComponent extends MessageHandler {
    protected totalPages? = 0;
    protected _page = 0;
    protected _size = 5;
    protected _pages: any = [];

    protected abstract getData():any;

    gotToPage(page: number) {
        this._page = page;
        this.getData();
      }
    
      goToFirstPage() {
        this._page = 0;
        this.getData();
      }
    
      goToPreviousPage() {
        this._page--;
        this.getData();
      }
    
      goToLastPage() {
        this._page = this.totalPages as number - 1;
        this.getData();
      }
    
      goToNextPage() {
        this._page++;
        this.getData();
      }
    
      isLastPage() {
        return this._page === this.totalPages as number - 1;
      }
    
      get page(): number {
        return this._page;
      }
      get size(): number {
        return this._size;
      }
      get pages(): any {
        return this._pages;
      }
}