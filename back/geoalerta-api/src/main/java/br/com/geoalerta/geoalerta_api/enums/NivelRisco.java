package br.com.geoalerta.geoalerta_api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum NivelRisco {
    BAIXO,
    MEDIO,
    ALTO,
    CRITICO;

    @JsonCreator
    public static NivelRisco fromString(String value) {
        if (value == null) return null;
        return NivelRisco.valueOf(value.trim().toUpperCase());
    }
}
