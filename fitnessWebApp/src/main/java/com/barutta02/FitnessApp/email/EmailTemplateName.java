package com.barutta02.FitnessApp.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {

    ACTIVATE_ACCOUNT("activate_account") //this is the name of the template file
    ;


    private final String name;
    EmailTemplateName(String name) {
        this.name = name;
    }
}
