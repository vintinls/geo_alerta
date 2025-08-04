package br.com.geoalerta.geoalerta_api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum EtapaAnalise {
	EM_ANALISE,
    EM_PROCESSO_DE_VISITA,
    AGUARDANDO_NOVA_VISTORIA,
    CONCLUIDO;

    @JsonCreator
    public static EtapaAnalise fromString(String value) {
        if (value == null) return null;
        return EtapaAnalise.valueOf(value.trim().toUpperCase());
    }
}
