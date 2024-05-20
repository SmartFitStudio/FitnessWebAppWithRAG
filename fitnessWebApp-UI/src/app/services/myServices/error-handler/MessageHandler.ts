import { ErrorHandlerService } from "./error-handler.service";

export abstract class MessageHandler {
    protected _messages: Array<String> = [];
    protected _codes: Array<number> = [];
    protected _level: 'success' | 'error' = 'success';

    constructor(private handleError: ErrorHandlerService) { }

    protected handleErrorMessages(error: any) {
        this._level = 'error';
        this.handleError.handleError(error).forEach((value) => {
            this._codes.push(value.code);
            this._messages.push(value.message);
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
}   