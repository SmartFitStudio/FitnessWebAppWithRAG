import { Message } from "primeng/api";
import { ErrorHandlerService } from "./error-handler.service";

export abstract class MessageHandler {
    protected _codes: Array<number> = [];
    protected _messages: Message[] = [];

    constructor(private handleError: ErrorHandlerService) { }

    protected handleErrorMessages(error: any) {
        this.handleError.handleError(error).forEach((value) => {
            this._codes.push(value.code);
            this._messages.push({ severity: 'error', detail: value.message });
        });
    }

    //BOILERPLATE CODE
    get messages() {
        return this._messages;
    }
    set messages(value: Message[]) {
        this._messages = value;
    }

    protected clearMessages() {
        this._messages = [];
    }

    protected addMessage(severity: 'success' | 'info' | 'warn' | 'error'| 'secondary'| 'contrast' , message: string) {
        this._messages.push({ severity: severity, detail: message });
    }
}   