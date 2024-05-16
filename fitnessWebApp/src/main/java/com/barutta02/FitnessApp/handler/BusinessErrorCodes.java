package com.barutta02.FitnessApp.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_IMPLEMENTED;

/**
 * This enum represents the business error codes used in the application.
 * Each error code has a corresponding HTTP status and description.
 */
public enum BusinessErrorCodes {
    NO_CODE(0, NOT_IMPLEMENTED, "No code"),
    INCORRECT_CURRENT_PASSWORD(300, BAD_REQUEST, "Password corrente non corretta"),
    NEW_PASSWORD_DOES_NOT_MATCH(301, BAD_REQUEST, "Le nuove password non corrispondono"),
    ACCOUNT_LOCKED(302, FORBIDDEN, "L'account utente è bloccato"),
    ACCOUNT_DISABLED(303, FORBIDDEN, "L'account utente è disabilitato"),
    BAD_CREDENTIALS(304, FORBIDDEN, "Login fallito: credenziali non valide"),
    ;

    @Getter
    private final int code;
    @Getter
    private final String description;
    @Getter
    private final HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus status, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = status;
    }
}
