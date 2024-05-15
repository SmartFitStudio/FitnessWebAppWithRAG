package com.barutta02.FitnessApp.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

// This class is used to configure the OpenApi documentation
// The OpenApi documentation is used to describe the API
// The OpenApi documentation is used to generate the API documentation
@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Andrea Barutta",
                        email = "andreabarutta123@gmail.com",
                        url = "https://barutta02.github.io/Barutta_portfolio/"
                ),
                description = "OpenApi documentation for Spring Security",
                title = "OpenApi specification - Andrea Barutta",
                version = "1.0",
                license = @License(
                        name = "Licence name",
                        url = "https://some-url.com"
                ),
                termsOfService = "Terms of service"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8088/api/v1"
                ),
                @Server(
                        description = "PROD ENV",
                        url = "https://some-url.com/api/v1"
                )
        },
        security = {
                @SecurityRequirement(
                        name = "bearerAuth" //for every endpoint the bearerAuth is required
                )
        }
)
@SecurityScheme(
        name = "bearerAuth", //needs to be the same as the name in the SecurityRequirement
        description = "JWT auth description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
