import { Message } from "primeng/api";
import { ErrorHandlerService } from "./error-handler.service";

export abstract class MessageHandler {
    protected _messages: Array<String> = [];
    protected _codes: Array<number> = [];
    protected _primeMessages: Message[] = [];
    protected _level: 'success' | 'error' = 'success';

    constructor(private handleError: ErrorHandlerService) { }

    protected handleErrorMessages(error: any) {
        this._level = 'error';
        this.handleError.handleError(error).forEach((value) => {
            this._codes.push(value.code);
            this._messages.push(value.message);
            this._primeMessages.push({ severity: 'error', summary: value.code.toString(), detail: value.message });
        });
    }

    //BOILERPLATE CODE
    get messages() {
        return this._messages;
    }
    get level() {
        return this._level;
    }
    set messages(value: Array<String>) {
        this._messages = value;
    }
    set level(value: 'success' | 'error') {
        this._level = value;
    }
    protected clearMessages() {
        this._messages = [];
    }

    protected addMessage(message: string) {
        this._messages.push(message);
        this._primeMessages.push({ severity: this._level, detail: message });
    }

    get primeMessages() {
        return this._primeMessages;
    }
}   