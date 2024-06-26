import { get } from "http";
import { MessageHandler } from "../myServices/error-handler/MessageHandler";

export interface PageEvent {
    first?: number;
    rows?: number;
    page?: number;
    pageCount?: number;
}

export abstract class PaginatedComponent extends MessageHandler {


    first: number = 0;
    rows: number = 5;
    rowsPerPageOptions = [5, 10, 20];

    protected lastPageEvent: PageEvent = {
        first: this.first,
        rows: this.rows
    };
    protected totalPages? = 0;

    onPageChange(event: PageEvent) {
        this.first = event.first? event.first : 0;
        this.rows = event.rows? event.rows : 5;
        this.lastPageEvent = event;
        this.getData();
    }

    protected abstract getData():any;

    get totalRecords(): number {
        return this.totalPages? this.totalPages * this.rows : 0;
    }

}