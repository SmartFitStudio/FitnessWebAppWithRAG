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
    USER_NOT_FOUND(305, FORBIDDEN, "Utente non trovato"),
    OPERATION_NOT_PERMITTED(306, FORBIDDEN, "Operazione non permessa"),
    INVALID_TOKEN(307, FORBIDDEN, "Token non valido"),
    INVALID_REFRESH_TOKEN(308, FORBIDDEN, "Refresh token non valido"),
    INVALID_PASSWORD(309, FORBIDDEN, "Password non valida"),
    INVALID_EMAIL(310, FORBIDDEN, "Email non valida"),
    INVALID_USERNAME(311, FORBIDDEN, "Username non valido"),
    INVALID_ROLE(312, FORBIDDEN, "Ruolo non valido"),
    INVALID_DATE(313, BAD_REQUEST, "Data non valida"),
    INVALID_ID(314, BAD_REQUEST, "ID non valido"),
    INVALID_NAME(315, BAD_REQUEST, "Nome non valido"),
    INVALID_DESCRIPTION(316, BAD_REQUEST, "Descrizione non valida"),
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
