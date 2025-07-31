package br.com.geoalerta.geoalerta_api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum StatusAlerta {
    PENDENTE,
    AVALIADO;

    @JsonCreator
    public static StatusAlerta fromString(String value) {
        if (value == null) return null;
        return StatusAlerta.valueOf(value.trim().toUpperCase());
    }
}
