package br.com.geoalerta.geoalerta_api.dto;

import br.com.geoalerta.geoalerta_api.enums.EtapaAnalise;

import java.time.LocalDateTime;

public class AnaliseAlertaResponseDTO {
    private Long id;
    private String nivelRisco;
    private String observacoes;
    private LocalDateTime dataAnalise;
    private String analistaNome;
    private EtapaAnalise etapa; // NOVO CAMPO

    public AnaliseAlertaResponseDTO(
        Long id,
        String nivelRisco,
        String observacoes,
        LocalDateTime dataAnalise,
        String analistaNome,
        EtapaAnalise etapa // NOVO
    ) {
        this.id = id;
        this.nivelRisco = nivelRisco;
        this.observacoes = observacoes;
        this.dataAnalise = dataAnalise;
        this.analistaNome = analistaNome;
        this.etapa = etapa; // NOVO
    }

    public Long getId() {
        return id;
    }

    public String getNivelRisco() {
        return nivelRisco;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public LocalDateTime getDataAnalise() {
        return dataAnalise;
    }

    public String getAnalistaNome() {
        return analistaNome;
    }

    public EtapaAnalise getEtapa() {
        return etapa;
    }
}
