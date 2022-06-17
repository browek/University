package pl.nasza.uczelnia.project.core;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseErrorMessage {

    private String error;
    private String errorStatus;
}