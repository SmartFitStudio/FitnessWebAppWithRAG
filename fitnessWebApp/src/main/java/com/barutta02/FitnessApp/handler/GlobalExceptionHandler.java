package com.barutta02.FitnessApp.handler;

import jakarta.mail.MessagingException;
import reactor.netty.http.client.PrematureCloseException;

import org.springframework.core.codec.DecodingException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.barutta02.FitnessApp.exception.ActivationTokenException;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;

import java.util.HashSet;
import java.util.Set;

import static com.barutta02.FitnessApp.handler.BusinessErrorCodes.ACCOUNT_DISABLED;
import static com.barutta02.FitnessApp.handler.BusinessErrorCodes.ACCOUNT_LOCKED;
import static com.barutta02.FitnessApp.handler.BusinessErrorCodes.BAD_CREDENTIALS;
import static com.barutta02.FitnessApp.handler.BusinessErrorCodes.OPERATION_NOT_PERMITTED;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.SERVICE_UNAVAILABLE;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestControllerAdvice // This annotation is used to handle exceptions globally in the application
public class GlobalExceptionHandler {

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ExceptionResponse> handleException(LockedException exp) {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ACCOUNT_LOCKED.getCode())
                                .businessErrorDescription(ACCOUNT_LOCKED.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ExceptionResponse> handleException(DisabledException exp) {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ACCOUNT_DISABLED.getCode())
                                .businessErrorDescription(ACCOUNT_DISABLED.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }


    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException() {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BAD_CREDENTIALS.getCode())
                                .businessErrorDescription(BAD_CREDENTIALS.getDescription())
                                .error("Login fallito: credenziali non valide")
                                .build()
                );
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ExceptionResponse> handleException(MessagingException exp) {
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(ActivationTokenException.class)
    public ResponseEntity<ExceptionResponse> handleException(ActivationTokenException exp) {
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(OperationNotPermittedException.class)
    public ResponseEntity<ExceptionResponse> handleException(OperationNotPermittedException exp) {
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponse> handleException(IllegalArgumentException exp) {
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(OPERATION_NOT_PERMITTED.getCode())
                                .businessErrorDescription(exp.getMessage())
                                .error(OPERATION_NOT_PERMITTED.getDescription())
                                .build()
                );
    }

    /**
     * Qui gestiamo le eccezioni lanciate dalle annotazioni di validazione
     * 
     * @param exp
     * @return
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException exp) {
        Set<String> errors = new HashSet<>();
        exp.getBindingResult().getAllErrors()
                .forEach(error -> {
                    //var fieldName = ((FieldError) error).getField();
                    var errorMessage = error.getDefaultMessage();
                    errors.add(errorMessage);
                });

        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .validationErrors(errors)
                                .build()
                );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionResponse> handleException(DataIntegrityViolationException exp) {
        exp.printStackTrace();
        return ResponseEntity
                .status(CONFLICT)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(CONFLICT.value())
                                .businessErrorDescription("La risorsa richiesta è già presente nel sistema.")
                                .error(exp.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception exp) {
        exp.printStackTrace();
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorDescription("Errore interno del server, riprova più tardi.")
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(WebClientRequestException.class)
    public ResponseEntity<ExceptionResponse> handleException(WebClientRequestException exp) {
        return ResponseEntity
                .status(SERVICE_UNAVAILABLE)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(SERVICE_UNAVAILABLE.value())
                                .businessErrorDescription("Il sistema di intelligenza artificiale al momento non è raggiungibile.\n Si prega di riprovare più tardi.")
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(PrematureCloseException.class)
    public ResponseEntity<ExceptionResponse> handleException(PrematureCloseException exp) {
        return ResponseEntity
                .status(SERVICE_UNAVAILABLE)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(SERVICE_UNAVAILABLE.value())
                                .businessErrorDescription("Il sistema di intelligenza artificiale al momento non è raggiungibile.\n Si prega di riprovare più tardi.")
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(WebClientResponseException.class)
    public ResponseEntity<ExceptionResponse> handleException(WebClientResponseException exp) {
        return ResponseEntity
                .status(exp.getStatusCode())
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(exp.getStatusCode().value())
                                .businessErrorDescription(exp.getResponseBodyAs(ExceptionResponse.class).getError())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DecodingException.class)
    public ResponseEntity<ExceptionResponse> handleException(DecodingException exp) {
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(INTERNAL_SERVER_ERROR.value())
                                .businessErrorDescription("Non è stato possibile generare l'allenamento richiesto.\n Si prega di riprovare più tardi.")
                                .error(exp.getMessage())
                                .build()
                );
    }
}